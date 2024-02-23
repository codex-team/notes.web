import { userService } from '@/domain';
import { useAppState } from './useAppState';

/**
 * User settings hook state
 */
interface UseUserSettingsComposableState {
  /**
   * Add tool to the user settings
   */
  addTool(id: string): Promise<void>;

  /**
   * Remove tool from the user settings
   */
  removeTool(id: string): Promise<void>;
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
    await userService.addTool(id);
  }

  /**
   * Remove tool from the user settings
   *
   * @param id - Tool identifier
   */
  async function removeTool(id: string): Promise<void> {
    await userService.removeTool(id);
  }

  return {
    addTool,
    removeTool,
  };
}
