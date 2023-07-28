import Note from '@/domain/entities/Note';

/**
 * Note repository interface
 */
export default interface NoteRepository {

  /**
   * Returns a Note by id
   *
   * @param id - Note id
   * @returns Note | null - Note instance
   */
  getNoteById(id: number): Promise<Note | null>;
}
