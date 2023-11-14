import type EditorToolRepositoryInterface from '@/domain/editorTool.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type EditorTool from '@/domain/entities/EditorTool';

/**
 * Facade for the user data
 */
export default class EditorToolRepository implements EditorToolRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   *
   * @param notesApiTransport - notes api transport instancea
   */
  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Returns all editor tools
   */
  public async getAllEditorTool(): Promise<EditorTool[]> {
    /**
     * Get tool data from API
     */
    const response = await this.transport.get<{ data: EditorTool[] }>('/editor-tools/all');

    return (response.data);
  }
}
