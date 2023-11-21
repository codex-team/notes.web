import type { Note, NoteContent } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights.ts';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteRepositoryInterface {

  /**
   * Returns a Note and NoteAccessRights by id
   *
   * @param publicId - Note id
   * @returns note - Note instance, accessRights - NoteAccessRights instance
   * @throws NotFoundError
   */
  getNoteById(publicId: string): Promise<{ note: Note, accessRights: NoteAccessRights }>;

  /**
   * Returns a Note and NoteAccessRights by hostname
   *
   * @param hostname - Custom hostname
   * @returns note - Note instance, accessRights - NoteAccessRights instance
   */
  getNoteByHostname(hostname: string): Promise<{ note: Note, accessRights: NoteAccessRights }>;

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
