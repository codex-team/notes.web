import type EditorToolRepositoryInterface from '@/domain/tools.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type { EditorToolStore, EditorToolStoreData } from './storage/tools';
import type { EditorTool } from '@/domain/entities/EditorTool';
import Repository from './repository';

/**
 * Facade for the editor tools
 */
export default class EditorToolRepository extends Repository<EditorToolStore, EditorToolStoreData> implements EditorToolRepositoryInterface  {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   *
   * @param store - stores editor tools
   * @param notesApiTransport - notes api transport instance
   */
  constructor(store: EditorToolStore, notesApiTransport: NotesApiTransport) {
    super(store);

    this.transport = notesApiTransport;
  }

  /**
   * Api request to get list of tools
   */
  public async loadEditorTool(): Promise<void> {
    const response = await this.transport.get<EditorTool>('/editor-tools/all');

    this.store.setEditorTools(response);
  };

  /**
   * Load editor tools data and put it to the storage
   */
  public getEditorTool(): EditorTool | null  {
    return this.store.getEditorTool();
  }
}
