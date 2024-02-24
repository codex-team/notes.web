import type { BlockTool } from '@editorjs/editorjs';
import Editor, { type OutputData, type API } from '@editorjs/editorjs';
// @ts-expect-error editor plugins have no types
import Header from '@editorjs/header';
import { Ref, ref, shallowRef } from 'vue';
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';
import { loadScript } from '@/infrastructure/utils/load-script';
import { createSharedComposable } from '@vueuse/core';

/**
 * Downloaded tools data structure
 */
type DownloadedTools = Record<string, BlockTool>;

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
  onChange?: (api: API) => void;
}

/**
 * Handles Editor.js instance creation
 *
 * @param params - Editor.js params
 */
export const useEditor = createSharedComposable(({ id, content, isReadOnly, onChange }: UseEditorParams): void => {
  /**
   * Editor instance
   */
  let editor: Editor | undefined;

  /**
   * Downloaded tools data
   */
  const downloadedTools = shallowRef<DownloadedTools>({})

  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();

  /**
   * Download all the user tools and stores them in a map to use in Editor.js constructor
   *
   * @param tools - tools data
   */
  async function downloadTools(tools: Ref<EditorTool[]>): Promise<void> {

    for (const tool of tools.value) {
      if (tool.source.cdn === undefined) {
        continue;
      }

      if (tool.name in downloadedTools.value) {
        continue;
      }

      await loadScript(tool.source.cdn);

      downloadedTools.value[tool.name] = window[tool.exportName as keyof typeof window]
    }
  }

  /**
   * Initializes editorjs instance
   */
  async function mountEditor(): Promise<void> {
    try {
      await downloadTools(userEditorTools);

      editor = new Editor({
        holder: id,
        data: content,
        tools: {
          header: Header,
          ...downloadedTools.value,
        },
        onChange,
        readOnly: isReadOnly,
      });

      await editor.isReady;
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(() => {
    void mountEditor();
  });

  /**
   * Destroy editor instance after unmount
   */
  onBeforeUnmount(() => {
    editor?.destroy();
    editor = undefined;
  });
})
