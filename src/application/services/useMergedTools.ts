import { type Ref, ref, watch } from 'vue';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';
import { createSharedComposable } from '@vueuse/core';

/**
 * Service for merge tools with user's tools
 * @param tools - tools we need to connect
 */
function useMergedTools(tools: Ref<EditorTool[]>): {
  /**
   * Connected user and connectable tools
   */
  tools: Ref<EditorTool[]>;
} {
  /**
   * User notes tools
   */
  const { userEditorTools } = useAppState();
  const mergedTools = ref<EditorTool[] | undefined>();

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
    () => {
      mergedTools.value = mergeTools(userEditorTools.value || [], tools.value);
    },
    { immediate: true }
  );

  return {
    tools,
  };
}

export default createSharedComposable(useMergedTools);
