import { type Ref, ref, watch } from 'vue';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';
import { loadScript } from '@/infrastructure/utils/load-script';
import type { EditorConfig } from '@editorjs/editorjs';

/**
 * Downloaded tools data structure
 */
type DownloadedTools = EditorConfig['tools'];

/**
 * Service for load editor tools
 *
 * @param noteTools - note tools
 */
export function useTools(noteTools: Ref<EditorTool[]>): {
  tools: Ref<DownloadedTools | undefined>;
  allTools: Ref<EditorTool[] | undefined>;
} {
  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();
  const tools = ref<DownloadedTools | undefined>();
  const allTools = ref<EditorTool[] | undefined>();

  /**
   * Download all the user tools and return a map
   *
   * @param toolsList - tools data
   */
  async function downloadTools(toolsList: EditorTool[]): Promise<DownloadedTools> {
    const downloadedTools: DownloadedTools = {};

    for (const tool of toolsList) {
      if (tool.source.cdn === undefined) {
        continue;
      }

      await loadScript(tool.source.cdn);

      downloadedTools[tool.name] = window[tool.exportName as keyof typeof window];
    }

    return downloadedTools;
  }

  /**
   * Merge two arrays of tools, removing duplicates
   *
   * @param toolsA – first array of tools
   * @param toolsB – second array of tools
   */
  function mergeTools(toolsA: EditorTool[], toolsB: EditorTool[]): EditorTool[] {
    const uniqueTools = new Map<string, EditorTool>();

    [...toolsA, ...toolsB].forEach((tool) => {
      uniqueTools.set(tool.name, tool);
    });

    return Array.from(uniqueTools.values());
  }

  watch(
    [userEditorTools, noteTools],
    async () => {
      allTools.value = mergeTools(userEditorTools.value || [], noteTools.value);

      /**
       * If tools are not loaded yet or empty, skip downloading their scripts
       */
      if (allTools.value.length === 0) {
        return;
      }
      tools.value = await downloadTools(allTools.value);
    },
    { immediate: true }
  );

  return {
    tools,
    allTools,
  };
}
