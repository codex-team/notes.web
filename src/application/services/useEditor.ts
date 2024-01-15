import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Editor, { type OutputData, type API } from '@editorjs/editorjs';
import type EditorTool from '@/domain/entities/EditorTool';
// @ts-expect-error: we need to rewrite plugins to TS to get their types
import Header from '@editorjs/header';
import { useAppState } from './useAppState';

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
    onChange: (api: API) => void
}

/**
 * Load one tool at a time
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
 * Application service for working with Editor
 *
 */
export function useEditor({ content, isReadOnly, onChange } : EditorProps): void {
  /**
   * Editor.js instance
   */
  const editor = ref<Editor | undefined>(undefined);

  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();

  /**
   * Function for loading and adding tools to Editor
   */
  const mountEditorOnce = async (): Promise<void> => {
    Promise.allSettled(userEditorTools.value.map((spec: EditorTool) => {
      if (spec.source.cdn === undefined || spec.source.cdn === "") {
        return undefined;
      }

      return loadScript(spec.source.cdn);
    })).then(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const loadedTools: {[key: string]: any } = userEditorTools.value.reduce(
        (acc, spec: EditorTool) => {
          // @ts-expect-error: we need to rewrite plugins to TS to get their types
          const windowPlugin = window[spec.exportName];

          return {
            ...acc,
            [spec.title]: windowPlugin,
          };
        },
        {}
      );


      const editorInstance = new Editor({
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
          // image: Image,
          // code: CodeTool,
          // list: List,
          // delimiter: Delimiter,
          // table: Table,
          // warning: Warning,
          // checklist: Checklist,
          // linkTool: LinkTool,
          // raw: RawTool,
          // embed: Embed,

          // /**
          //  * Inline Tools
          //  */
          // inlineCode: InlineCode,
          // marker: Marker,
          ...loadedTools,
        },
        data: content,
        onChange,
        readOnly: isReadOnly,
      });

      await editorInstance.isReady;

      editor.value = editorInstance;
    })
      .catch(console.error);
  };

  /**
   * Update editor instance when user tools was changed
   */
  watch(userEditorTools, mountEditorOnce);

  /**
   * Set editor instance after first mount
   */
  onMounted(() => {
    if (userEditorTools.value.length > 0) {
      mountEditorOnce().catch(console.info);
    }
  });

  /**
   * Add content to editor
   */
  // eslint-disable-next-line @typescript-eslint/no-shadow
  watch(() => content, (content) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (content === undefined) {
      editor.value?.clear();

      return;
    }

    if (editor.value) {
      editor.value.render(content).catch(console.error);
    }
  });

  /**
   * Destroy editor instance after unmount
   */
  onBeforeUnmount(() => {
    editor.value?.destroy();
    editor.value = undefined;
  });
}