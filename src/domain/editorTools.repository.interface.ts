import type EditorTool from './entities/EditorTool';
import type { EditorToolLoaded } from './entities/EditorTool';

/**
 * Tools repository interface describes the methods
 */
export default interface EditorToolsRepositoryInterface {
  /**
   * Load and return tools plugins classes
   */
  getToolsLoaded: (tools: EditorTool[]) => Promise<EditorToolLoaded[]>;

  /**
   * Returns a loaded tool by name
   * @param name - tool name is not unique in the system, but unique in the user's tools
   */
  getToolByName: (name: string) => EditorToolLoaded | undefined;
}
