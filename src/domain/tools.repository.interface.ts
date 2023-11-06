import type { EditorTool } from './entities/EditorTool';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface EditorToolRepositoryInterface {
  /**
   * Loads and stores editor tools data
   */
  loadEditorTool: () => Promise<void>;

  /**
   * Return stored editor tools data
   */
  getEditorTool: () => EditorTool | null;
}