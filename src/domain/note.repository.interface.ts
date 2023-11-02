import type { Note, NoteContent } from '@/domain/entities/Note';
import type { NoteList } from './entities/NoteList';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteRepositoryInterface {

  /**
   * Returns a Note by id
   *
   * @param publicId - Note id
   * @returns Note | null - Note instance
   * @throws NotFoundError
   */
  getNoteById(publicId: string): Promise<Note>;

  /**
   * Returns a Note by hostname
   *
   * @param hostname - Custom hostname
   * @returns Note | null - Note instance
   */
  getNoteByHostname(hostname: string): Promise<Note | null>;

  /**
   * Returns a list of notes by creator id
   *
   * @param userId - user id
   * @param page - number of pages
   */
  getNoteListByCreatorId(userId: number, page: number): Promise<NoteList>;

  /**
   * Creates a new note
   *
   * @param content - Note content (Editor.js data)
   */
  createNote(content: NoteContent): Promise<Note>;

  /**
   * Updates a content of existing note
   *
   * @param id - What note to update
   * @param content - Note content (Editor.js data)
   */
  updateNoteContent(id: string, content: NoteContent): Promise<void>;
}
