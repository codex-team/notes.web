import type MarketplaceRepositoryInterface from '@/domain/marketplace.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type EditorTool from '@/domain/entities/EditorTool';
import type { NewToolData } from '@/domain/entities/EditorTool';

interface AddEditorToolDto extends Omit<EditorTool, 'cover'> {
  cover?: File;
}

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
    const data = new FormData();

    data.append('name', tool.name);
    data.append('title', tool.title);
    data.append('exportName', tool.exportName);

    if (tool.description !== undefined) {
      data.append('description', tool.description);
    }

    if (tool.source !== undefined) {
      data.append('source', JSON.stringify(tool.source));
    }

    if (tool.cover !== undefined) {
      data.append('cover', tool.cover);
    }

    const res = await this.transport.post<{ data: AddEditorToolDto }, { data: EditorTool }>('/editor-tools/add-tool', data);

    return res.data;
  }
}
