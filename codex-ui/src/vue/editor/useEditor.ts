import Editor, { type OutputData, type API, BlockTool } from '@editorjs/editorjs';
// @ts-expect-error editor plugins have no types
import Header from '@editorjs/header';
import type { Ref } from 'vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * Downloaded tools data structure
 */
export type DownloadedTools = Record<string, BlockTool>;

/**
 * UseEditor composable params
 */
interface UseEditorParams {
  /**
   * Host element id
   */
  id: string;

  /**
   * Editor initial content
   */
  content?: OutputData;

  /**
   * True if editor should not allow editing
   */
  isReadOnly?: boolean;

  /**
   * Handles content change in Editor
   */
  onChange?: (data: OutputData) => void;

  /**
   * Loaded user tools for Editor
   */
  tools: DownloadedTools;
}

/**
 * Handles Editor.js instance creation
 *
 * @param params - Editor.js params
 */
export function useEditor({ id, content, isReadOnly, onChange, tools }: UseEditorParams): {
  isEmpty: Ref<boolean>;
  refresh: (data: OutputData) => void;
} {
  /**
   * Editor instance
   */
  // @ts-expect-error Ts config doesn't match with Editor
  let editor: Editor | undefined;

  /**
   * Attribute containing is-empty state.
   * It is updated on every change of the editor
   */
  const isEmpty = ref(true);

  /**
   * Checks if the editor is empty
   * Uses EditorJS API:
   *  - blocks.getById()
   *  - block.isEmpty()
   *
   * @todo implement "isEmpty" method in the EditorJS API
   *
   * @param data - saved data
   * @param api - EditorJS API
   */
  function checkIsEmpty(data: OutputData, api: API): boolean {
    const blockIds = data.blocks.map((block) => block.id);

    return blockIds.reduce((acc, blockId) => {
      if (blockId === undefined) {
        return acc;
      }

      const block = api.blocks.getById(blockId);

      if (block) {
        return acc && block.isEmpty;
      }

      return acc;
    }, true);
  }

  /**
   * Function called on every change of the editor
   *
   * @param api - EditorJS API
   */
  async function handleChange(api: API): Promise<void> {
    const data = await api.saver.save();

    /**
     * Update the isEmpty attribute
     */
    isEmpty.value = checkIsEmpty(data, api);

    onChange?.(data);
  }

  /**
   * Initializes editorjs instance
   *
   * @param data
   */
  async function mountEditor(data?: OutputData): Promise<void> {
    try {
      // @ts-expect-error Ts config doesn't match with Editor
      editor = new Editor({
        holder: id,
        data: data,
        tools: {
          header: Header,
          ...tools,
        },
        onChange: handleChange,
        readOnly: isReadOnly,
      });

      await editor?.isReady;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Reinitialized editor instance with new data
   *
   * @param data - new data to be displayed in editor
   */
  async function refresh(data?: OutputData): Promise<void> {
    editor?.destroy();
    await mountEditor(data);
  }

  onMounted(() => {
    void mountEditor(content);
  });

  /**
   * Destroy editor instance after unmount
   */
  onBeforeUnmount(() => {
    editor?.destroy();
    editor = undefined;
  });

  return {
    isEmpty,
    refresh,
  };
}
