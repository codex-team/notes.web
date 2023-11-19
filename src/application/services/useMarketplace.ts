import type EditorTool from '@/domain/entities/EditorTool';
import { type Ref, ref, onMounted } from 'vue';
import { marketplaceService } from '@/domain';

/**
 * Composable for the application state
 */
interface UseMarketplaceComposable {
  /**
   * All editor tools that are used in notes creation
   */
  tools: Ref<EditorTool[]>
}

/**
 * Application service for working with the Editor Tools
 */
export default function (): UseMarketplaceComposable {
  /**
   *  All editor tools
   */
  const tools = ref<EditorTool[]>([]);

  /**
   * Get list of all tools
   */
  onMounted(async () => {
    tools.value = await marketplaceService.getAllTools();
  });


  return {
    tools: tools,
  };
}
