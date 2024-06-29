import type ToolsRepository from '@/domain/editorTools.repository.interface';
import type { EditorConfigTools } from '@/domain/entities/EditorTool';
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
  public async getTools(tools: EditorTool[]): Promise<EditorConfigTools> {
    return await this.repository.getTools(tools);
  }
}
