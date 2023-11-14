import type EditorToolRepository from '@/domain/editorTool.repository.interface';
import type EditorTool  from './entities/EditorTool';

/**
 * Business logic for User
 */
export default class EditorToolService {
  /**
   * Facade for accessing user data
   */
  private readonly repository: EditorToolRepository;

  /**
   * Service constructor
   *
   * @param eventBus - Common domain event bus
   * @param editorToolRepository - repository instance
   */
  constructor(editorToolRepository: EditorToolRepository) {
    this.repository = editorToolRepository;
  }

  /**
   * Returns list of all tools data
   */
  public async getAllTools(): Promise<EditorTool[]> {
    return await this.repository.getAllEditorTool();
  }
}
