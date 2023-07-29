import type NoteRepositoryInterface from '@/domain/note.repository.interface';
import type Note from '@/domain/entities/Note';
import type NoteStorage from '@/infrastructure/storage/note';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { GetNoteResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteResponsePayload';

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

  /**
   * Get note by hostname
   *
   * @param hostname - Custom hostname linked with one Note
   * @returns { Note | null } - Note instance
   */
  public async getNoteByHostname(hostname: string): Promise<Note | null> {
    const noteData = await this.noteStorage.getNoteByHostname(hostname);

    /**
     * If note data in storage exists
     */
    if (noteData) {
      return noteData;
    }

    /**
     * Get note data from API
     */
    const note = await this.transport.post<GetNoteResponsePayload>('/note/resolve-hostname', { 'hostname':hostname });

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
