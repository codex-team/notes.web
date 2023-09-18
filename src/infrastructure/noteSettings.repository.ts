import type NoteSettingsRepositoryInterface from '@/domain/noteSettings.repository.interface';
import type NotesSettings from '@/domain/entities/NotesSettings';
import type NoteStorage from '@/infrastructure/storage/note';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { GetNotesSettingsResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteResponsePayload';

/**
 * Note repository
 */
export default class NoteSettingsRepository implements NoteSettingsRepositoryInterface {
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
}
