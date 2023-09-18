import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteSettingsRepositoryInterface {

  /**
   * Returns NotesSettings by publicId
   *
   * @param publicId - note publicId
   * @returns NotesSettings | null - NotesSettings instance
   */
  getNotesSettingsById(publicId: string): Promise<NotesSettings | null>;
}
