import type EditorTool from '@/domain/entities/EditorTool';
import { type Ref, ref, onMounted, watch } from 'vue';
import { marketplaceService } from '@/domain';
import type { EditorToolWithUserBinding } from '@/domain/entities/EditorTool';
import { useAppState } from './useAppState';

/**
 * Composable for the application state
 */
interface UseMarketplaceComposable {
  /**
   * Get list of all tools with user binding
   */
  tools: Ref<EditorToolWithUserBinding[]>
}

/**
 * Application service for working with the Editor Tools
 */
export default function (): UseMarketplaceComposable {
  /**
   *  List of tools with user binding
   */
  const toolsWithUserBindings = ref<EditorToolWithUserBinding[]>([]);

  /**
   * User tools
   */
  const { userEditorTools } = useAppState();

  /**
   * List of all tools
   */
  const availableTools = ref<EditorTool[]>([]);

  /**
   * Get list of all tools
   */
  onMounted(async () => {
    availableTools.value = await marketplaceService.getAllTools();

    toolsWithUserBindings.value = marketplaceService.getToolsWithUserBindings(userEditorTools.value, availableTools.value);
  });

  /**
   * Check if user tools are changed
   */
  watch(userEditorTools, async (newValue) => {
    /**
     * Update list of tools with user binding
     */
    toolsWithUserBindings.value = marketplaceService.getToolsWithUserBindings(newValue, availableTools.value);
  });

  return {
    tools: toolsWithUserBindings,
  };
};
