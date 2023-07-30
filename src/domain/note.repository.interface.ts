import type Note from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Note repository interface
 */
export default interface NoteRepositoryInterface {

  /**
   * Returns a Note by id
   *
   * @param id - Note id
   * @returns Note | null - Note instance
   */
  getNoteById(id: number): Promise<Note | null>;

  /**
   * Returns a Note by hostname
   *
   * @param hostname - Custom hostname
   * @returns Note | null - Note instance
   */
  getNoteByHostname(hostname: string): Promise<Note | null>;

  /**
   * Returns NotesSettings by hostname
   *
   * @param hostname - Custom hostname
   * @returns NotesSettings | null - NotesSettings instance
   */
  getNotesSettingsById(id: number): Promise<NotesSettings | null>;
}
