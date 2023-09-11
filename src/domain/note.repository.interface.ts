import type { Note, NoteContent } from '@/domain/entities/Note';
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

  /**
   * Returns NotesSettings by publicId
   *
   * @param publicId - note publicId
   * @returns NotesSettings | null - NotesSettings instance
   */
  getNotesSettingsById(publicId: string): Promise<NotesSettings | null>;
}
