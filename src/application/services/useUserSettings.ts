import { userService } from '@/domain';
import { useAppState } from './useAppState';
import EditorTool from '@/domain/entities/EditorTool';

/**
 * User settings hook state
 */
interface UseUserSettingsComposableState {
  /**
   * Add tool to the user settings
   */
  addTool(id: string): Promise<void>

  /**
   * Remove tool from the user settings
   */
  removeTool(id: string): Promise<void>
}

/**
 * Methods for working with user settings
 */
export function useUserSettings(): UseUserSettingsComposableState {
  const { userEditorTools } = useAppState();

  /**
   * Add tool to the user settings
   *
   * @param id - Tool identifier
   */
  async function addTool(id: string): Promise<void> {
    const addedToolData = await userService.addTool(id);

    userEditorTools.value = [...userEditorTools.value, addedToolData.addedTool];
  }

  /**
   * Remove tool from the user settings
   *
   * @param id - Tool identifier
   */
  async function removeTool(id: string): Promise<void> {
    const deletedToolData = await userService.removeTool(id);

    userEditorTools.value = userEditorTools.value.filter((tool) => tool.id !== deletedToolData.removedId);
  }

  return {
    addTool,
    removeTool,
  };
}
