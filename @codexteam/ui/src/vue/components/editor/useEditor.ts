import Editor, { type OutputData, type API, type EditorConfig } from '@editorjs/editorjs';
import type { MaybeRefOrGetter, Ref } from 'vue';
import { onBeforeUnmount, ref, toValue, watch } from 'vue';

interface UseEditorOptions {
  /**
   * Callback called on every change of the editor
   * @param data - new editor content data
   */
  onChange?: (data: OutputData) => void;
}

/**
 * Return value of the useEditor composable
 */
interface UseEditorComposableState {
  /**
   * Attribute containing is-empty state.
   */
  isEmpty: Ref<boolean>;

  /**
   * Returns the current content, including changes not yet reported by onChange
   */
  save: () => Promise<OutputData | undefined>;
}

/**
 * Methods for working with the Editor.js instance
 * @param editorConfig - reactive object with the editor configuration
 * @param options - additional options of the  composable
 */
export function useEditor(editorConfig: MaybeRefOrGetter<EditorConfig>, options: UseEditorOptions): UseEditorComposableState {
  /**
   * Editor instance
   */
  let editor: Editor | undefined;

  /**
   * Attribute containing is-empty state.
   * It is updated on every change of the editor
   */
  const isEmpty = ref(true);

  /**
   * Checks if the editor is empty
   * Uses EditorJS API:
   * - blocks.getById()
   * - block.isEmpty()
   * @todo implement "isEmpty" method in the EditorJS API
   * @param data - saved data
   * @param api - EditorJS API
   */
  function checkIsEmpty(data: OutputData, api: API): boolean {
    const blockIds = data.blocks.map(block => block.id);

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
   * @param api - EditorJS API
   * @param instance - editor that reported the change
   */
  async function handleChange(api: API, instance: Editor): Promise<void> {
    const data = await api.saver.save();

    /**
     * Editor.js reports changes with a delay, drop the ones from an editor that has been destroyed meanwhile
     */
    if (instance !== editor) {
      return;
    }

    /**
     * Update the isEmpty attribute
     */
    isEmpty.value = checkIsEmpty(data, api);

    options.onChange?.(data);
  }

  /**
   * Destroy the editor instance
   */
  function destroyEditor(): void {
    if (editor === undefined || editor.destroy === undefined) {
      return;
    }

    editor.destroy();
    editor = undefined;
  }

  /**
   * Initializes editorjs instance
   */
  async function createEditor(): Promise<void> {
    if (editor !== undefined) {
      destroyEditor();
    }

    const config = toValue(editorConfig);

    try {
      const instance: Editor = new Editor({
        ...config,
        onChange(api: API) {
          if (instance === editor) {
            void handleChange(api, instance);
          }
        },
      });

      editor = instance;

      await instance.isReady;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Reinitialized editor instance with new data
   */
  watch(editorConfig, () => {
    void createEditor();
  });

  /**
   * Destroy editor instance after unmount
   */
  onBeforeUnmount(() => {
    destroyEditor();
  });

  return {
    isEmpty,
    async save() {
      return await editor?.save();
    },
  };
}
