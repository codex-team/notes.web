import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import type { NoteList } from './entities/NoteList';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteRepositoryInterface {
  /**
   * Returns a Note, NoteAccessRights and parent note if exists by id
   *
   * @param publicId - Note id
   * @returns {{ note: Note, accessRights: NoteAccessRights, parentNote: Note | undefined }} - Returns a Note, NoteAccessRights and parent note (if exists) by id
   * @throws NotFoundError
   */
  getNoteById(publicId: string): Promise<{ note: Note; accessRights: NoteAccessRights; parentNote: Note | undefined }>;

  /**
   * Returns a Note and NoteAccessRights by hostname
   *
   * @param hostname - Custom hostname
   * @returns {{ note: Note, accessRights: NoteAccessRights }} - Note instance and NoteAccessRights instance
   */
  getNoteByHostname(hostname: string): Promise<{ note: Note; accessRights: NoteAccessRights }>;

  /**
   * Returns a list of notes
   *
   * @param page - number of pages
   */
  getNoteList(page: number): Promise<NoteList>;

  /**
   * Creates a new note
   *
   * @param content - Note content (Editor.js data)
   * @param parentId - Id of the parent note. If undefined, then it's a root note
   */
  createNote(content: NoteContent, parentId?: NoteId): Promise<Note>;

  /**
   * Updates a content of existing note
   *
   * @param id - What note to update
   * @param content - Note content (Editor.js data)
   */
  updateNoteContent(id: string, content: NoteContent): Promise<void>;

  /**
   * Unlink note from parent
   *
   * @param id - Note id
   */
  unlinkParent(id: NoteId): Promise<void>;

  /**
   * Set new parent for the note
   *
   * @param id - Child note id
   * @param parentNoteId - id of the new parent note
   */
  updateParent(id: NoteId, parentNoteId: NoteId): Promise<boolean>;
}
