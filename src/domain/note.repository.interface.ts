import type { Note, NoteContent } from '@/domain/entities/Note';
import type { NoteList } from './entities/NoteList';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteRepositoryInterface {

  /**
   * Returns a Note and NoteAccessRights by id
   *
   * @param publicId - Note id
   * @returns {{ note: Note, accessRights: NoteAccessRights }} - Note instance and NoteAccessRights instance
   * @throws NotFoundError
   */
  getNoteById(publicId: string): Promise<{ note: Note, accessRights: NoteAccessRights }>;

  /**
   * Returns a Note and NoteAccessRights by hostname
   *
   * @param hostname - Custom hostname
   * @returns {{ note: Note, accessRights: NoteAccessRights }} - Note instance and NoteAccessRights instance
   */
  getNoteByHostname(hostname: string): Promise<{ note: Note, accessRights: NoteAccessRights }>;

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
