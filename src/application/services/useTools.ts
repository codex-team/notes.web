import { type Ref, ref, watch } from 'vue';
import { useAppState } from './useAppState';
import { toolsService } from '@/domain';
import type EditorTool from '@/domain/entities/EditorTool';
import type { EditorConfig } from '@editorjs/editorjs';
import type { EditorConfigTools } from '@/domain/entities/EditorTool';

/**
 * Downloaded tools data structure
 */
type DownloadedTools = EditorConfig['tools'];

/**
 * Service for load editor tools
 * @param tools - note tools
 */
export function useTools(tools: Ref<EditorTool[]>): {
  toolsConnected: Ref<EditorConfigTools | undefined>;
  tools: Ref<EditorConfigTools | undefined>;
} {
  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();
  const toolsConnected = ref<EditorConfigTools | undefined>();
  const mergedTools = ref<EditorConfigTools | undefined>();

  /**
   * Merge two arrays of tools, removing duplicates
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
    [userEditorTools, tools],
    async () => {
      mergedTools.value = mergeTools(userEditorTools.value || [], tools.value);

      /**
       * If tools are not loaded yet or empty, skip downloading their scripts
       */
      if (tools.value.length === 0) {
        return;
      }

      toolsConnected.value = await toolsService.getTools(tools.value);
    },
    { immediate: true }
  );

  return {
    toolsConnected,
    tools: mergedTools,
  };
}
