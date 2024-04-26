import type EditorTool from './entities/EditorTool';
import type { EditorConfigTools } from './entities/EditorTool';

/**
 * Tools repository interface describes the methods
 */
export default interface ToolsRepositoryInterface {
  /**
   * Getting all editor tools
   */
  getTools: (tools: EditorTool[]) => Promise<EditorConfigTools>;
}
