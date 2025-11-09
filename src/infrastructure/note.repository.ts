import type NoteRepositoryInterface from '@/domain/note.repository.interface';
import type { Note, NoteContent, NoteId, NoteTool } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';
import type NoteStorage from '@/infrastructure/storage/note.js';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { GetNoteResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteResponsePayload';
import type { NoteList } from '@/domain/entities/NoteList';
import type { NoteDTO } from '@/domain/entities/NoteDTO';
import type JSONValue from './transport/types/JSONValue';
import type { NoteHierarchy } from '@/domain/entities/NoteHierarchy';

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
   * @param onlyCreatedByUser - if true, returns notes created by the user, otherwise returns all notes
   */
  public async getNoteList(page: number, onlyCreatedByUser = false): Promise<NoteList> {
    const endpoint = onlyCreatedByUser ? '/notes/my' : '/notes';
    return await this.transport.get<NoteList>(endpoint, { page });
  }

  /**
   * Creates a new note
   * @param content - Note content (Editor.js data)
   * @param noteTools - Tools that are used in note
   * @param parentId - Id of the parent note. If undefined, then it's a root note
   * @todo API should return Note
   */
  public async createNote(content: NoteContent, noteTools: NoteTool[], parentId?: NoteId): Promise<Note> {
    const response = await this.transport.post<{ id: NoteId }>({
      endpoint: '/note',
      data: {
        tools: noteTools,
        parentId,
        content: content as unknown as JSONValue,
      },
    });

    const note: Note = {
      id: response.id,
      content,
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

  /**
   * Set parent for the note
   * @param id  - Child note id
   * @param parentNoteId - New parent note id
   */
  public async setParent(id: NoteId, parentNoteId: NoteId): Promise<Note> {
    const response = await this.transport.post<{ parentNote: Note }>({
      endpoint: `/note/${id}/relation`,
      data: {
        parentNoteId,
      },
    });

    return response.parentNote;
  }

  /**
   * get Note hierarchy
   * @param id - note id
   */
  public async getNoteHierarchy(id: NoteId): Promise<NoteHierarchy | null> {
    const response = await this.transport.get<{ noteHierarchy: NoteHierarchy }>(`/note/note-hierarchy/${id}`);

    return response.noteHierarchy;
  }
}
