import type NoteRepositoryInterface from '@/domain/note.repository.interface';
import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import type NoteStorage from '@/infrastructure/storage/note.js';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { GetNoteResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteResponsePayload';
import type { GetNoteListPayload } from './transport/notes-api/types/GetNoteListResponsePayload';
import type { NoteList } from '@/domain/entities/NoteList';


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
   *
   * @param noteStorage - note storage instance
   * @param notesApiTransport - notes api transport instance
   */
  constructor(noteStorage: NoteStorage, notesApiTransport: NotesApiTransport) {
    this.noteStorage = noteStorage;
    this.transport = notesApiTransport;
  }

  /**
   * Get note by id
   *
   * @param id - Note identifier
   * @throws NotFoundError
   */
  public async getNoteById(id: string): Promise<Note> {
    /**
     * Get note data from API
     */
    return await this.transport.get<GetNoteResponsePayload>('/note/' + id);
  }

  /**
   * Get note by hostname
   *
   * @param hostname - Custom hostname linked with one Note
   * @returns { Note | null } - Note instance
   */
  public async getNoteByHostname(hostname: string): Promise<Note | null> {
    /**
     * Get note data from API
     */
    return await this.transport.get<GetNoteResponsePayload>('/note/resolve-hostname/' + encodeURIComponent(hostname));
  }

  /**
   * Gets note list by creator id
   *
   * @param userId - note creator id
   * @param page - number of pages to get
   */
  public async getNoteListByCreatorId(userId: number, page: number): Promise<NoteList> {
    return await this.transport.get<GetNoteListPayload>(`/notes`, { userId,
      page });
  }


  /**
   * Creates a new note
   *
   * @param content - Note content (Editor.js data)
   */
  public async createNote(content: NoteContent): Promise<Note> {
    const response = await this.transport.post<{ id: NoteId }>('/note', { content });

    const note: Note = {
      id: response.id,
      content,
    };

    return note;
  };

  /**
   * Updates a content of existing note
   *
   * @param id - What note to update
   * @param content - Note content (Editor.js data)
   */
  public async updateNoteContent(id: string, content: NoteContent): Promise<void> {
    await this.transport.patch(`/note/${id}`, {
      content,
    });
  }
}
