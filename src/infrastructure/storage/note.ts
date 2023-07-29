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
   * @param id - Note id
   * @returns { Note | null } - Note data
   */
  public async getNoteById(id: number): Promise<Note | null> {
    console.log('Get note by id', id);

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
   * @param id - Note id
   * @returns { NotesSettings | null } - Note data
   */
  public async getNotesSettingsById(id: number): Promise<NotesSettings | null> {
    console.log('Get notesSettings by id', id);

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
