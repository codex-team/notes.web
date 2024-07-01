import { type Ref, ref, watch } from 'vue';
import { editorToolsService } from '@/domain';
import type EditorTool from '@/domain/entities/EditorTool';
import type { EditorConfigTools } from '@/domain/entities/EditorTool';
import useMergedTools from '@/application/services/useMergedTools';

/**
 * Service for load editor tools
 * @param tools - downloadable tools
 */
export function useLoadedTools(tools: Ref<EditorTool[]>): {
  /**
   * Downloaded editor tools list
   */
  loadedTools: Ref<EditorConfigTools | undefined>;
} {
  const { mergedTools } = useMergedTools(tools);
  const loadedTools = ref<EditorConfigTools | undefined>();

  watch(
    [tools, mergedTools],
    async () => {
      loadedTools.value = await editorToolsService.getTools(mergedTools.value);
    },
    { immediate: true }
  );

  return {
    loadedTools,
  };
}
