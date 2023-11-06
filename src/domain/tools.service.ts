import type EditorToolRepository from '@/domain/tools.repository.interface';
import type { EditorTool } from './entities/EditorTool';

/**
 * Business logic for EditorTool
 */
export default class EditorToolService {
  /**
   * Facade for accessing tools
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
   * Returns editor tool data
   */
  public getEditorTool(): EditorTool | null {
    return this.repository.getEditorTool();
  }
}
