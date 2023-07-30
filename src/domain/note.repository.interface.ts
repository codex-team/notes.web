import type Note from '@/domain/entities/Note';

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
}
