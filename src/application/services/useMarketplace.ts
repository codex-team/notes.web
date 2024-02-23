import type EditorTool from '@/domain/entities/EditorTool';
import { type Ref, ref, onMounted, watch } from 'vue';
import { marketplaceService } from '@/domain';
import type { EditorToolWithUserBinding } from '@/domain/entities/EditorTool';

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
 *
 * @param userEditorTools - User editor tools that are used in notes creation
 */
export default function (userEditorTools: Ref<EditorTool[]>): UseMarketplaceComposable {
  /**
   *  All editor tools
   */
  const tools = ref<EditorToolWithUserBinding[]>([]);

  /**
   * Get list of all tools
   */
  onMounted(async () => {
    tools.value = await marketplaceService.getToolsWithUserBinding(userEditorTools.value);
  });

  watch(userEditorTools, async (newValue) => {
    tools.value.forEach(element => {
      element.isUserIncluded = newValue.some((userTool) => userTool.id === element.id);
    });
  });

  return {
    tools: tools,
  };
};
