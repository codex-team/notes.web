import { type Ref, ref, watch } from 'vue';
import { marketplaceService } from '@/domain';
import type { EditorToolWithUserBinding } from '@/domain/entities/EditorTool';
import { useAppState } from './useAppState';

/**
 * Composable for the application state
 */
interface UseMarketplaceComposable {
  /**
   * List of tools with information, if they are installed by the user
   */
  tools: Ref<EditorToolWithUserBinding[]>;
}

/**
 * Application service for working with the Editor Tools
 */
export default function (): UseMarketplaceComposable {
  const toolsWithUserBindings = ref<EditorToolWithUserBinding[]>([]);

  /**
   * User tools
   */
  const { userEditorTools } = useAppState();

  /**
   * Check if user tools are changed
   */
  watch(
    userEditorTools,
    async (newValue) => {
      toolsWithUserBindings.value = await marketplaceService.getAllToolsWithUserBindings(newValue);
    },
    {
      immediate: true,
    }
  );

  return {
    tools: toolsWithUserBindings,
  };
}
