import Editor, { type OutputData, type API } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import type { Ref } from 'vue';
import { onBeforeUnmount, onMounted } from 'vue';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';

/**
 * Editor.js tool
 */
type Tool = any;

/**
 * Editorjs params
 */
interface UseEditorParams {
  /** Host element id */
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
 * Handles Editor.js instance creation
 *
 * @param params - Editor.js params
 */
export function useEditor({ id, content, isReadOnly, onChange }: UseEditorParams): void {
  /**
   * Editor instance
   */
  let editor: Editor | undefined;

  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();

  /**
   * Downloads tool code
   *
   * @param tool - tool - data
   */
  async function downloadTool(tool: EditorTool): Promise<[string, Tool] | undefined> {
    if (tool.source.cdn === undefined) {
      return;
    }

    await loadScript(tool.source.cdn);

    return [tool.title, window[tool.exportName]];
  }

  /**
   * Download all the user tools
   *
   * @param tools - tools data
   */
  async function downloadTools(tools: Ref<EditorTool[]>): Promise<Record<string, Tool>> {
    const toolsData = await Promise.all(tools.value.map(downloadTool));

    return toolsData.reduce((acc, curr) => {
      if (curr === undefined) {
        return acc;
      }
      const name = curr[0];
      const obj = curr[1];

      acc[name] = obj;

      return acc;
    }, {});
  }

  /**
   * Initializes editorjs instance
   */
  async function mountEditor(): Promise<void> {
    try {
      const tools = await downloadTools(userEditorTools);

      editor = new Editor({
        holder: id,
        data: content,
        tools: {
          header: Header,
          ...tools,
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
}
