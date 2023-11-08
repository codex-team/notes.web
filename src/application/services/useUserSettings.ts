import { userService } from '@/domain';

/**
 * User settings hook state
 */
interface UseUserSettingsComposableState {
  /**
   * Add tool to the user settings
   */
  addTool(id: string): void
}


/**
 * Methods for working with user settings
 */
export function useUserSettings(): UseUserSettingsComposableState {
  /**
   * Add tool to the user settings
   *
   * @param id - Tool identifier
   */
  function addTool(id: string): void {
    userService.addTool(id);
  }

  return {
    addTool,
  };
}
