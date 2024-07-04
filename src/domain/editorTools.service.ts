import type ToolsRepository from '@/domain/editorTools.repository.interface';
import type { EditorToolLoaded } from '@/domain/entities/EditorTool';
import type EditorTool from '@/domain/entities/EditorTool';

/**
 * Implication service for tools
 */
export default class EditorToolsService {
  /**
   * Facade for accessing tools data
   */
  private readonly repository: ToolsRepository;

  /**
   * Service constructor
   * @param toolsRepository - repository instance
   */
  constructor(toolsRepository: ToolsRepository) {
    this.repository = toolsRepository;
  }

  /**
   * Returns all editor tools
   * @param tools - tools which we need to load
   * @returns list of tools
   */
  public async getToolsLoaded(tools: EditorTool[]): Promise<EditorToolLoaded[]> {
    return await this.repository.getToolsLoaded(tools);
  }

  /**
   * Returns loaded tool by name
   * @param name - tool name is not unique in the system, but unique in the user's tools
   */
  public getToolByName(name: string): EditorToolLoaded | undefined {
    return this.repository.getToolByName(name);
  }
}
