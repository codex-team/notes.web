import type NoteRepositoryInterface from '@/domain/note.repository.interface';
import type Note from '@/domain/entities/Note';
import type NoteStorage from '@/infrastructure/storage/note';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { GetNoteResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteResponsePayload';
import type CookieStorage from '@/infrastructure/storage/cookie';

/**
 * Note repository
 */
export default class NoteRepository implements NoteRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Cookie storage manager
   */
  private readonly cookieStorage: CookieStorage;

  /**
   * Note storage
   */
  private noteStorage: NoteStorage;

  /**
   * Note repository constructor
   *
   * @param noteStorage - note storage instance
   * @param notesApiTransport - notes api transport instance
   * @param cookieStorage - cookie storage instance
   */
  constructor(noteStorage: NoteStorage, notesApiTransport: NotesApiTransport, cookieStorage: CookieStorage) {
    this.cookieStorage = cookieStorage;
    this.noteStorage = noteStorage;
    this.transport = notesApiTransport;
  }

  /**
   * Get note by id
   *
   * @param id - Note id
   * @returns { Note | null } - Note instance
   */
  public async getNoteById(id: number): Promise<Note | null> {
    const noteData = await this.noteStorage.getNoteById(id);

    /**
     * If note data in storage exists
     */
    if (noteData) {
      return noteData;
    }

    /**
     * Get note data from API
     */
    const note = await this.transport.get<GetNoteResponsePayload>('/note/' + id);

    /**
     * If note data in API payload exists
     */
    if (note) {
      /**
       * Insert note to storage
       */
      await this.noteStorage.insertNote(note);
    }

    return note;
  }
}
