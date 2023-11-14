import type EditorTool from './entities/EditorTool';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface EditorToolRepositoryInterface {

  /**
   * Returns array of editor tools
   */
  getAllEditorTool: () => Promise<EditorTool[]>;
}
