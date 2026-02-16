import { type Ref, computed, ref, toValue, watch } from 'vue';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';
import { type NoteContent } from '@/domain/entities/Note';
import { editorToolsService } from '@/domain';
import type { EditorjsConfigTool } from '@/domain/entities/EditorTool';
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
   * Function to check if the note is a draft
   * In draft we wont wait for note tools loading
   */
  isDraftResolver: () => boolean;

  /**
   * Flag indicating that user can edit the note
   */
  canEdit: Ref<boolean>;
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
   */
  const { userEditorTools } = useAppState();

  /**
   * Loaded tools classes by grouped by tool.name
   * Undefined when tools are not loaded yet
   */
  let toolsUserConfig: Record<string, { class: EditorjsConfigTool; inlineToolbar: boolean }> | undefined = undefined;

  /**
   * We can't make toolsUserConfig reactive since it contains excecutable js-classes, Vue can't handle that.
   * So we store reactive flag to indicate that tools are loaded
   */
  const toolsUserConfigLoaded = ref<boolean>(false);

  /**
   * Combine note and user tools
   * Undefined when user or note is not loaded
   */
  const noteAndUserTools = computed<EditorTool[] | undefined>(() => {
    const isDraft = options.isDraftResolver();
    const noteTools = isDraft ? [] : toValue(options.noteTools);
    const userTools = toValue(userEditorTools) ?? [];

    /**
     * If tools are not loaded yet, return undefined
     */
    if (noteTools === undefined) {
      return undefined;
    }

    /**
     * Return unique array of tools grouped by tool.name
     */
    const combinedTools = [...noteTools, ...userTools];
    const uniqueTools = new Map(combinedTools.map(tool => [tool.name, tool]));

    return Array.from(uniqueTools.values());
  });

  /**
   * Downloads passed tools scripts and toggles-on the isEditorReady flag
   * @param toolsConfigs - tools to download
   */
  async function loadToolsScripts(toolsConfigs: EditorTool[]): Promise<void> {
    const loadedTools = await editorToolsService.getToolsLoaded(toolsConfigs);

    /**
     * We don't need to pass default paragraph tools
     * since it is alrady a part of the editor core
     */
    const loadedToolsWithoutParagraph = loadedTools.filter(tool => tool.tool.name !== 'paragraph');

    toolsUserConfig = Object.fromEntries(
      loadedToolsWithoutParagraph
        .map(toolClassAndInfo => [
          toolClassAndInfo.tool.name,
          {
            class: toolClassAndInfo.class,
            inlineToolbar: true,
          },
        ])
    );
    toolsUserConfigLoaded.value = true;

    /**
     * Now all tools are loaded, we're ready to use the editor
     */
    isEditorReady.value = true;
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

    await loadToolsScripts(tools);
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
