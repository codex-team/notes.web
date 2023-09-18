import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Note storage
 */
export default class NoteSettingsStorage {
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
