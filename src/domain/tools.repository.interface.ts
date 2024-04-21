import type EditorTool from './entities/EditorTool';

/**
 * Tools repository interface describes the methods
 */
export default interface ToolsRepositoryInterface {
  /**
   * Returns array of editor tools
   */
  getUserEditorTools: () => EditorTool[];

  /**
   * Adds a tool to the user
   *
   * @param id - tool id
   */
  addTool: (id: string) => Promise<void>;

  /**
   * Removes a tool from the user (marketplace mock)
   *
   * @param id - tool id
   */
  removeTool: (id: string) => Promise<void>;

  /**
   * Loads and store editor tools from user extensions
   */
  loadUserEditorTools: () => Promise<void>;
}
