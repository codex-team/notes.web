import type NotesApiTransport from './transport/notes-api';
import Repository from './repository';
import type EditorTool from '@/domain/entities/EditorTool';
import type { ToolsStore, ToolsStoreData } from '@/infrastructure/storage/tools';
import type ToolsRepositoryInterface from '@/domain/tools.repository.interface';

/**
 * Facade for the user data
 */
export default class ToolsRepository
  extends Repository<ToolsStore, ToolsStoreData>
  implements ToolsRepositoryInterface
{
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   *
   * @param store - stores user data
   * @param notesApiTransport - notes api transport instance
   */
  constructor(store: ToolsStore, notesApiTransport: NotesApiTransport) {
    super(store);

    this.transport = notesApiTransport;
  }

  /**
   * Load tools and set it
   */
  public async loadUserEditorTools(): Promise<void> {
    const response = await this.transport.get<{ data: EditorTool[] }>('/user/editor-tools');

    this.store.setUserEditorTools(response.data);
  }

  /**
   * Returns current user editor tools
   */
  public getUserEditorTools(): EditorTool[] {
    return this.store.getUserEditorTools();
  }

  /**
   * Adds a tool to the user
   *
   * @param id - tool id
   */
  public async addTool(id: string): Promise<void> {
    const res = await this.transport.post<{ addedTool: EditorTool }>('/user/editor-tools', {
      toolId: id,
    });

    this.store.addEditorTool(res.addedTool);
  }

  /**
   * Removes a tool from the user
   *
   * @param id - tool id
   */
  public async removeTool(id: string): Promise<void> {
    const res = await this.transport.delete<{ removedId: EditorTool['id'] }>('/user/editor-tools', {
      toolId: id,
    });

    this.store.removeEditorTool(res.removedId);
  }
}
