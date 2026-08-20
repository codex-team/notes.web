import { type Ref, computed, ref, toValue, watch } from 'vue';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';
import { type NoteContent } from '@/domain/entities/Note';
import { editorToolsService, noteSettingsService } from '@/domain';
import type { EditorjsConfigTool, EditorjsToolsConfig } from '@/domain/entities/EditorTool';
import { useI18n } from 'vue-i18n';

interface UseNoteEditorOptions {
  /**
   * Tools used in the note
   */
  noteTools: Ref<EditorTool[] | undefined>;

  /**
   * Function to get note content
   */
  noteContentResolver: () => NoteContent | undefined;

  /**
   * Flag indicating that user can edit the note
   */
  canEdit: Ref<boolean>;

  /**
   * Note id to build image upload endpoint
   * Null for new notes
   */
  noteId: Ref<string | null>;
}

interface UseNoteEditorComposableState {
  /**
   * Flag indicating that the editor is ready to be shown
   * Now we can show <Editor> component
   */
  isEditorReady: Ref<boolean>;

  /**
   * Editor configuration object
   */
  editorConfig: Ref<Record<string, unknown>>;
}

/**
 * To show Editor in Note we need to follow these steps:
 * 1. Load note data along with content and tools
 * 2. Load user tools
 * 3. Merge note and user tools
 * 4. Download corresponding scripts for tools
 * 5. Initialize Editor with tools
 *
 * This app service is doing all these steps and provides isEditorReady flag to indicate that <Editor> component can be shown
 * Also, it provides editorConfig object to pass to <Editor> component
 * @param options - options for the composable
 */
export const useNoteEditor = function useNoteEditor(options: UseNoteEditorOptions): UseNoteEditorComposableState {
  const isEditorReady = ref(false);

  const { t } = useI18n();

  /**
   * Reactive object with editor tools installed by user
   * User is undefined while authorization is in progress,
   * null when user is not authenticated, User instance otherwise
   */
  const { userEditorTools, user } = useAppState();

  /**
   * Loaded tools classes by grouped by tool.name
   * Undefined when tools are not loaded yet
   */
  let toolsUserConfig: EditorjsToolsConfig | undefined = undefined;

  /**
   * We can't make toolsUserConfig reactive since it contains excecutable js-classes, Vue can't handle that.
   * So we store reactive flag to indicate that tools are loaded
   */
  const toolsUserConfigLoaded = ref<boolean>(false);

  /**
   * Incremented on each new load request to discard stale async results.
   * Prevents race conditions when rapid note switching causes multiple
   * concurrent loadToolsScripts invocations.
   */
  let currentLoadId = 0;

  /**
   * Combine note and user tools
   * Returns undefined when tools are not loaded yet to prevent
   * premature editor rendering with an incomplete tools set
   */
  const noteAndUserTools = computed<EditorTool[] | undefined>(() => {
    const noteTools = toValue(options.noteTools);
    const userTools = toValue(userEditorTools);
    const currentUser = toValue(user);

    /**
     * If note tools are not loaded yet, return undefined to prevent
     * premature editor rendering
     */
    if (noteTools === undefined) {
      return undefined;
    }

    /**
     * If user is authenticated but their tools are not loaded yet, wait for them to load
     * When user is not authenticated userTools stays undefined
     */
    if (currentUser !== null && userTools === undefined) {
      return undefined;
    }

    /**
     * Return unique array of tools grouped by tool.name
     */
    const combinedTools = [...noteTools, ...(userTools ?? [])];
    const uniqueTools = new Map(combinedTools.map(tool => [tool.name, tool]));

    return Array.from(uniqueTools.values());
  });

  /**
   * Downloads passed tools scripts and returns the loaded config object.
   * Does not mutate shared state — the caller is responsible for applying the result
   * @param toolsConfigs - tools to download
   * @returns loaded tools config
   */
  async function loadToolsScripts(toolsConfigs: EditorTool[]): Promise<EditorjsToolsConfig> {
    const loadedTools = await editorToolsService.getToolsLoaded(toolsConfigs);

    /**
     * We don't need to pass default paragraph tools
     * since it is alrady a part of the editor core
     */
    const loadedToolsWithoutParagraph = loadedTools.filter(tool => tool.tool.name !== 'paragraph');

    return Object.fromEntries(
      loadedToolsWithoutParagraph
        .map((toolClassAndInfo) => {
          const toolConfig: { class: EditorjsConfigTool; inlineToolbar: boolean; config?: Record<string, unknown> } = {
            class: toolClassAndInfo.class,
            inlineToolbar: true,
          };

          /**
           * Add image tool config with a custom uploader
           * that uses the authorized note attachment upload method
           */
          if (toolClassAndInfo.tool.name === 'image') {
            const noteId = toValue(options.noteId);

            if (noteId !== null) {
              toolConfig.config = {
                /**
                 * The image tool internally accesses `this.config.endpoints.byFile`
                 * when a file is selected, even when a custom uploader is provided
                 * Provide an empty endpoints object to prevent a TypeError
                 */
                endpoints: {
                  byFile: '',
                },
                features: {
                  caption: 'optional',
                },
                uploader: {
                  /**
                   * Uploads file using the existing authorized repository method
                   * @param file - file selected in the editor
                   */
                  uploadByFile: async (file: File): Promise<{ success: 1; file: { url: string } }> => {
                    const url = await noteSettingsService.uploadImage(noteId, file);

                    return {
                      success: 1,
                      file: {
                        url,
                      },
                    };
                  },
                  /**
                   * When a user pastes an image URL, use it as-is
                   * without uploading the image to the server
                   * @param url - image URL pasted by the user
                   */
                  uploadByUrl: (url: string): Promise<{ success: 1; file: { url: string } }> => {
                    return Promise.resolve({
                      success: 1,
                      file: {
                        url,
                      },
                    });
                  },
                },
              };
            }
          }

          return [toolClassAndInfo.tool.name, toolConfig];
        })
    );
  }

  /**
   * Wait until we get both note and user tools
   * Then, load tools scripts
   */
  watch(noteAndUserTools, async (tools) => {
    /**
     * If tools are not loaded yet, wait for the next change
     */
    if (tools === undefined) {
      return;
    }

    const loadId = ++currentLoadId;

    isEditorReady.value = false;
    toolsUserConfigLoaded.value = false;

    try {
      const loadedConfig = await loadToolsScripts(tools);

      /**
       * If a newer load request has superseded this one — discard stale results
       * to prevent overwriting state with tools from a previous note.
       */
      if (loadId !== currentLoadId) {
        return;
      }

      toolsUserConfig = loadedConfig;
      toolsUserConfigLoaded.value = true;
    } catch (error) {
      throw new Error(`Failed to load tools scripts: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      /**
       * Display the editor regardless of tool loading failures, as it can be displayed with default tools.
       * Only the latest load request may mark the editor as ready
       */
      if (loadId === currentLoadId) {
        isEditorReady.value = true;
      }
    }
  }, {
    immediate: true, // load tools if they are passed to the composable immediately
  });

  /**
   * Prepare editor configuration using loadeed tools and note content
   */
  const editorConfig = computed(() => {
    return {
      holderId: 'editorjs',
      data: options.noteContentResolver(),
      readOnly: toValue(options.canEdit) === false,
      tools: toolsUserConfigLoaded.value ? toolsUserConfig : undefined,
      placeholder: t('note.editor.placeholder'),
      inlineToolbar: true,
    };
  });

  return {
    isEditorReady,
    editorConfig,
  };
};
