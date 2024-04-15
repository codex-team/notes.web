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
 * Service for load user tools
 */
export function useUserTools(): {
  userTools: Ref<DownloadedTools | undefined>;
} {
  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();
  const userTools = ref<DownloadedTools | undefined>();

  /**
   * Download all the user tools and return a map
   *
   * @param tools - tools data
   */
  async function downloadTools(tools: EditorTool[]): Promise<DownloadedTools> {
    const downloadedTools: DownloadedTools = {};

    for (const tool of tools) {
      if (tool.source.cdn === undefined) {
        continue;
      }

      await loadScript(tool.source.cdn);

      downloadedTools[tool.name] = window[tool.exportName as keyof typeof window];
    }

    return downloadedTools;
  }

  watch(
    userEditorTools,
    async () => {
      /**
       * If user tools are not loaded yet or empty, skip downloading their scripts
       */
      if (userEditorTools.value === undefined || userEditorTools.value?.length === 0) {
        return;
      }
      userTools.value = await downloadTools(userEditorTools.value);
    },
    { immediate: true }
  );

  return {
    userTools,
  };
}
