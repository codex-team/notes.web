import type NoteRepositoryInterface from '@/domain/note.repository.interface';
import type { Note, NoteContent, NoteId, NoteTool } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';
import type NoteStorage from '@/infrastructure/storage/note.js';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { GetNoteResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteResponsePayload';
import type { NoteList } from '@/domain/entities/NoteList';
import type { NoteDTO } from '@/domain/entities/NoteDTO';

/**
 * Note repository
 */
export default class NoteRepository implements NoteRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Note storage
   */
  private noteStorage: NoteStorage;

  /**
   * Note repository constructor
   * @param noteStorage - note storage instance
   * @param notesApiTransport - notes api transport instance
   */
  constructor(noteStorage: NoteStorage, notesApiTransport: NotesApiTransport) {
    this.noteStorage = noteStorage;
    this.transport = notesApiTransport;
  }

  /**
   * Get note by id
   * @param id - Note identifier
   * @throws NotFoundError
   * @returns - Note instance, NoteAccessRights instance
   * and parent note, if exists
   */
  public async getNoteById(id: string): Promise<NoteDTO> {
    /**
     * Get note data from API
     */
    return await this.transport.get<GetNoteResponsePayload>('/note/' + id);
  }

  /**
   * Get note by hostname
   * @param hostname - Custom hostname linked with one Note
   * @returns - Note instance and NoteAccessRights instance
   */
  public async getNoteByHostname(hostname: string): Promise<{ note: Note; accessRights: NoteAccessRights }> {
    /**
     * Get note data from API
     */
    return await this.transport.get<GetNoteResponsePayload>('/note/resolve-hostname/' + encodeURIComponent(hostname));
  }

  /**
   * Gets note list
   * @param page - number of pages to get
   */
  public async getNoteList(page: number): Promise<NoteList> {
    return await this.transport.get<NoteList>(`/notes`, { page });
  }

  /**
   * Creates a new note
   * @param content - Note content (Editor.js data)
   * @param noteTools - Tools that are used in note
   * @param parentId - Id of the parent note. If undefined, then it's a root note
   * @todo API should return Note
   */
  public async createNote(content: NoteContent, noteTools: NoteTool[], parentId?: NoteId): Promise<Note> {
    const response = await this.transport.post<{ id: NoteId }>('/note', {
      content,
      tools: noteTools,
      parentId,
    });

    const note: Note = {
      id: response.id,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return note;
  }

  /**
   * Updates a content of existing note
   * @param id - What note to update
   * @param content - Note content (Editor.js data)
   * @param noteTools - Tools that are used in note
   */
  public async updateNoteContentAndTools(id: string, content: NoteContent, noteTools: NoteTool[]): Promise<void> {
    await this.transport.patch(`/note/${id}`, {
      content,
      tools: noteTools,
    });
  }

  /**
   * Unlink note from parent
   * @param id - Child note id
   */
  public async unlinkParent(id: NoteId): Promise<void> {
    await this.transport.delete(`/note/${id}/relation`);
  }
}
