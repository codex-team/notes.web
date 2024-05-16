import type MarketplaceRepositoryInterface from '@/domain/marketplace.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type EditorTool from '@/domain/entities/EditorTool';
import type { NewToolData } from '@/domain/entities/EditorTool';

/**
 * Facade for the marketplace data
 */
export default class MarketplaceRepository implements MarketplaceRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   * @param notesApiTransport - notes api transport instance
   */
  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Returns all editor tools
   */
  public async getToolsAvailable(): Promise<EditorTool[]> {
    /**
     * Get tool data from API
     */
    const response = await this.transport.get<{ data: EditorTool[] }>('/editor-tools/all');

    return response.data;
  }

  /**
   * Add new tool to the marketplace
   * @param tool - tool data
   */
  public async addTool(tool: NewToolData): Promise<EditorTool> {
    const res = await this.transport.post<{ data: EditorTool }>('/editor-tools/add-tool', tool);

    return res.data;
  }
}
