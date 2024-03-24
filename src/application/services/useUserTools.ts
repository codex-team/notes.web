import type { BlockTool } from '@editorjs/editorjs';
import { type Ref, ref, onMounted } from 'vue';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';
import { loadScript } from '@/infrastructure/utils/load-script';

/**
 * Downloaded tools data structure
 */
type DownloadedTools = Record<string, BlockTool>;

/**
 * Service for load user tools
 */
export function useUserTools(): {
  userTools: Ref<DownloadedTools | undefined>;
} {
  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();
  const userTools = ref<DownloadedTools | undefined>(undefined);

  /**
   * Download all the user tools and return a map
   *
   * @param tools - tools data
   */
  async function downloadTools(tools: Ref<EditorTool[]>): Promise<DownloadedTools> {
    const downloadedTools: DownloadedTools = {};

    for (const tool of tools.value) {
      if (tool.source.cdn === undefined) {
        continue;
      }

      await loadScript(tool.source.cdn);

      downloadedTools[tool.name] = window[tool.exportName as keyof typeof window];
    }

    return downloadedTools;
  }

  /**
   * First load user tools
   */
  onMounted(async () => {
    userTools.value = await downloadTools(userEditorTools);
  });

  return {
    userTools,
  };
}
