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
   * @param publicId - Note publicId
   * @returns { Note | null } - Note instance
   */
  public async getNoteById(publicId: string): Promise<Note | null> {
    const noteData = await this.noteStorage.getNoteById(publicId);

    /**
     * If note data in storage exists
     */
    if (noteData) {
      return noteData;
    }

    /**
     * Get note data from API
     */
    const note = await this.transport.get<GetNoteResponsePayload>('/note/' + publicId);

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
   * @param publicId - Note publicId
   * @returns { NotesSettings | null } - NotesSettings instance
   */
  public async getNotesSettingsById(publicId: string): Promise<NotesSettings | null> {
    const notesSettingsData = await this.noteStorage.getNotesSettingsById(publicId);

    /**
     * If notesSettings data in storage exists
     */
    if (notesSettingsData) {
      return notesSettingsData;
    }

    /**
     * Get notesSettingsData data from API
     */
    const notesSettings = await this.transport.get<GetNotesSettingsResponsePayload>('/note/' + publicId + '/settings');

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
  /**
   * Updates a content of existing note
   *
   * @param publicId - Note publicId
   * @param content - Note content (Editor.js data)
   */
  public async updateNoteContent(publicId: string, content: Note['content']): Promise<void> {
    await this.transport.patch('/note/' + publicId, {
      content,
    });

    /**
     * Insert note to storage
     */
    await this.noteStorage.updateNoteContent(publicId, content);
  }
}
