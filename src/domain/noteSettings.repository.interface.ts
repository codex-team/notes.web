import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteSettingsRepositoryInterface {

  /**
   * Returns NotesSettings by  id
   *
   * @param  id - note  id
   * @returns NotesSettings | null - NotesSettings instance
   */
  getNotesSettingsById(id: string): Promise<NotesSettings | null>;
}
