import { type Ref, ref, watch, onMounted } from 'vue';
import { marketplaceService } from '@/domain';
import type { NewToolData, EditorToolWithUserBinding } from '@/domain/entities/EditorTool';
import { useAppState } from './useAppState';
import type EditorTool from '@/domain/entities/EditorTool';

/**
 * Composable for the application state
 */
interface UseMarketplaceComposable {
  /**
   * List of tools with information, if they are installed by the user
   */
  tools: Ref<EditorToolWithUserBinding[]>;

  /**
   * Add new tool to the marketplace
   *
   * @param tool - tool data
   */
  addTool: (tool: NewToolData) => Promise<void>;
}

/**
 * Application service for working with the Editor Tools
 */
export default function (): UseMarketplaceComposable {
  const toolsWithUserBindings = ref<EditorToolWithUserBinding[]>([]);
  const availableTools = ref<EditorTool[]>([]);

  /**
   * Create a list of tools with information, if they are installed by the user
   *
   * @param tools - list of all tools
   * @param userTools - list of user tools
   */
  const getToolsWithUserBindings = (tools: EditorTool[], userTools: EditorTool[]): EditorToolWithUserBinding[] => {
    return tools.map((tool) => {
      return {
        ...tool,
        isInstalled: userTools.some((userTool) => userTool.id === tool.id),
      };
    });
  };

  /**
   * User tools
   */
  const { userEditorTools } = useAppState();

  onMounted(async () => {
    availableTools.value = await marketplaceService.getAllTools();

    if (userEditorTools.value !== undefined) {
      toolsWithUserBindings.value = getToolsWithUserBindings(availableTools.value, userEditorTools.value);
    }
  });

  /**
   * Check if user tools are changed
   */
  watch(
    userEditorTools,
    async (newValue) => {
      if (newValue === undefined) {
        return;
      }
      toolsWithUserBindings.value = getToolsWithUserBindings(availableTools.value, newValue);
    },
    {
      immediate: true,
    }
  );

  /**
   * Add new tool to the marketplace
   *
   * @param tool - tool data
   */
  const addTool = async (tool: NewToolData): Promise<void> => {
    await marketplaceService.addTool(tool);
  };

  return {
    tools: toolsWithUserBindings,
    addTool,
  };
}
