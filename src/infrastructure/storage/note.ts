import type Note from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Note storage
 */
export default class NoteStorage {
  /**
   * Note storage constructor
   */
  constructor() {
    console.log('Created note storage');
  }

  /**
   * Get note by id
   *
   * @param publicId - Note publicId
   * @returns { Note | null } - Note data
   */
  public async getNoteById(publicId: string): Promise<Note | null> {
    console.log('Get note by publicId', publicId);

    return null;
  }

  /**
   * Get note by hostname
   *
   * @param hostname - Custom hostname
   * @returns { Note | null } - Note data
   */
  public async getNoteByHostname(hostname: string): Promise<Note | null> {
    console.log('Get note by hostname', hostname);

    return null;
  }

  /**
   * Insert note
   *
   * @param note - note to insert
   */
  public async insertNote(note: Note): Promise<void> {
    console.log('Insert note', note);

    return;
  }

  /**
   * Get notesSettings by id
   *
   * @param publicId - Note publicId
   * @returns { NotesSettings | null } - Note data
   */
  public async getNotesSettingsById(publicId: string): Promise<NotesSettings | null> {
    console.log('Get notesSettings by publicId', publicId);

    return null;
  }

  /**
   * Update notesSettings
   *
   * @param notesSettings - notesSettings to update
   */
  public async updateNotesSettings(notesSettings: NotesSettings): Promise<void> {
    console.log('Update notesSettings', notesSettings);

    return;
  }
}
