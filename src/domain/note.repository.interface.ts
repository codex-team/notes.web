import type Note from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteRepositoryInterface {

  /**
   * Returns a Note by id
   *
   * @param publicId - Note id
   * @returns Note | null - Note instance
   */
  getNoteById(publicId: string): Promise<Note | null>;

  /**
   * Returns a Note by hostname
   *
   * @param hostname - Custom hostname
   * @returns Note | null - Note instance
   */
  getNoteByHostname(hostname: string): Promise<Note | null>;

  /**
   * Loads note completion suggested by AI based on note content
   *
   * @param content - note content
   */
  fetchSuggestions(content: string): Promise<string>

  /**
   * Returns NotesSettings by publicId
   *
   * @param publicId - note publicId
   * @returns NotesSettings | null - NotesSettings instance
   */
  getNotesSettingsById(publicId: string): Promise<NotesSettings | null>;
}
