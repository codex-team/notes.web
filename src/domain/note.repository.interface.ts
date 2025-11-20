import type { Note, NoteContent, NoteId, NoteTool } from '@/domain/entities/Note';
import type { NoteList } from './entities/NoteList';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';
import type { NoteDTO } from './entities/NoteDTO';
import type { NoteHierarchy } from './entities/NoteHierarchy';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteRepositoryInterface {
  /**
   * Returns a Note, NoteAccessRights and parent note if exists by id
   * @param publicId - Note id
   * @returns {{ note: Note, accessRights: NoteAccessRights, parentNote: Note | undefined }} - Returns a Note, NoteAccessRights and parent note (if exists) by id
   * @throws NotFoundError
   */
  getNoteById(publicId: string): Promise<NoteDTO>;

  /**
   * Returns a Note and NoteAccessRights by hostname
   * @param hostname - Custom hostname
   * @returns {{ note: Note, accessRights: NoteAccessRights }} - Note instance and NoteAccessRights instance
   */
  getNoteByHostname(hostname: string): Promise<{ note: Note; accessRights: NoteAccessRights }>;

  /**
   * Returns a list of notes
   * @param page - number of pages
   * @param onlyCreatedByUser - if true, returns notes created by the user
   */
  getNoteList(page: number, onlyCreatedByUser?: boolean): Promise<NoteList>;

  /**
   * Creates a new note
   * @param content - Note content (Editor.js data)
   * @param noteTools - Tools that are used in note
   * @param parentId - Id of the parent note. If undefined, then it's a root note
   */
  createNote(content: NoteContent, noteTools: NoteTool[], parentId?: NoteId): Promise<Note>;

  /**
   * Updates a content of existing note
   * @param id - What note to update
   * @param content - Note content (Editor.js data)
   * @param noteTools - Tools that are used in note
   */
  updateNoteContentAndTools(id: string, content: NoteContent, noteTools: NoteTool[]): Promise<void>;

  /**
   * Unlink note from parent
   * @param id - Id of the note to unlink
   */
  unlinkParent(id: NoteId): Promise<void>;

  /**
   * Set parent for the note
   * @param id  - Child note id
   * @param parentNoteId - New parent note id
   */
  setParent(id: NoteId, parentNoteId: NoteId): Promise<Note>;

  /**
   * Returns Note Hierarchy
   * @param id - note id
   */
  getNoteHierarchy(id: NoteId): Promise<NoteHierarchy | null>;
}
