import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import Editor, { type OutputData, type API } from '@editorjs/editorjs';
import type EditorTool from '@/domain/entities/EditorTool';
// @ts-expect-error: we need to rewrite plugins to TS to get their types
import Header from '@editorjs/header';
import { useAppState } from './useAppState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobalEditorTool = any;

/**
 * Interface describing hook props
 */
interface EditorProps {
  /**
   * Content displayed in Editor
   */
  content?: OutputData;

  /**
   * Allow edit content in Editor
   */
  isReadOnly?: boolean;

  /**
   * Handler for every content change in Editor
   */
  onChange: (api: API) => void;
}

/**
 * Add promise which is rejected after loading is complete
 *
 * @param src - source path to tool
 */
function loadScript(src: string): Promise<Event> {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');

    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Load user editor tools
 *
 * @param userEditorTools User editor tools
 */
function loadUserTools(
  userEditorTools: Ref<Array<EditorTool>>
): Promise<Array<PromiseSettledResult<Event | undefined>>> {
  return Promise.allSettled(
    userEditorTools.value.map((spec: EditorTool) => {
      if (spec.source.cdn === undefined || spec.source.cdn === '') {
        return undefined;
      }

      return loadScript(spec.source.cdn);
    })
  );
}

/**
 * Create Editor.js tools settings from editor tools
 *
 * @param userEditorTools User editor tools
 */
function createToolsSettings(
  userEditorTools: Ref<Array<EditorTool>>
): Record<string, GlobalEditorTool> {
  return userEditorTools.value.reduce((acc, spec: EditorTool) => {
    // @ts-expect-error: we need to rewrite plugins to TS to get their types
    const windowPlugin = window[spec.exportName];

    return {
      ...acc,
      [spec.title]: windowPlugin,
    };
  }, {});
}

/**
 * Application service for working with Editor
 */
export function useEditor({
  content,
  isReadOnly,
  onChange,
}: EditorProps): void {
  /**
   * Editor.js instance
   */
  let editor: Editor | undefined;

  /**
   * Editor content instance
   */
  const refContent = ref<OutputData | undefined>(content);

  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();

  /**
   * Function for loading and adding tools to Editor
   */
  const mountEditor = async (): Promise<void> => {
    try {
      await loadUserTools(userEditorTools);

      const loadedTools = createToolsSettings(userEditorTools);

      editor = new Editor({
        /**
         * Block Tools
         */
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Title...',
            },
          },
          ...loadedTools,
        },
        data: refContent.value,
        onChange,
        readOnly: isReadOnly,
      });

      await editor.isReady;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Update editor instance when user tools was changed
   */
  watch(userEditorTools, mountEditor);

  /**
   * Set editor instance after first mount
   */
  onMounted(() => {
    if (userEditorTools.value.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      mountEditor();
    }
  });

  /**
   * Add content to editor
   */
  watch(
    () => refContent,
    (watchedRef) => {
      const watchedContent = watchedRef.value;

      if (watchedContent === undefined) {
        editor?.clear();

        return;
      }

      editor?.render(watchedContent).catch(console.error);
    }
  );

  /**
   * Destroy editor instance after unmount
   */
  onBeforeUnmount(() => {
    editor?.destroy();
    editor = undefined;
  });
}
