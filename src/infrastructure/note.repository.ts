import type NoteRepositoryInterface from '@/domain/note.repository.interface';
import type Note from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';
import type NoteStorage from '@/infrastructure/storage/note.js';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { GetNoteResponsePayload, GetNotesSettingsResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteResponsePayload';

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
    const note = await this.transport.get<GetNoteResponsePayload>('/note/resolve-hostname/' + encodeURIComponent(hostname));

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
   * Get NotesSettings by note ID
   *
   * @param id - Note ID
   * @returns { NotesSettings | null } - NotesSettings instance
   */
  public async getNotesSettingsById(id: number): Promise<NotesSettings | null> {
    const notesSettingsData = await this.noteStorage.getNotesSettingsById(id);

    /**
     * If notesSettings data in storage exists
     */
    if (notesSettingsData) {
      return notesSettingsData;
    }

    /**
     * Get notesSettingsData data from API
     */
    const notesSettings = await this.transport.get<GetNotesSettingsResponsePayload>('/note/' + id + '/settings');

    /**
     * If note data in API payload exists
     */
    if (notesSettings) {
      /**
       * Insert note to storage
       */
      await this.noteStorage.updateNotesSettings(notesSettings);
    }

    return notesSettings;
  }
}
