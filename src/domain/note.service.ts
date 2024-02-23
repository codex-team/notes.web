import type NoteRepository from '@/domain/note.repository.interface';
import type { Note, NoteContent } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';

/**
 * Note Service
 */
export default class NoteService {
  /**
   * Note repository
   */
  private readonly noteRepository: NoteRepository;

  /**
   * Note Service constructor
   *
   * @param noteRepository - Note repository instance
   */
  constructor(noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  /**
   * Returns a note and accessRights by its id
   *
   * @param id - Note identifier
   * @throws NotFoundError
   * @returns {{ note: Note, accessRights: NoteAccessRights }} - note data and accessRights data
   */
  public async getNoteById(id: string): Promise<{ note: Note, accessRights: NoteAccessRights }> {
    return await this.noteRepository.getNoteById(id);
  }

  /**
   * Get note and accessRights by hostname
   *
   * @param hostname - Custom hostname linked with a note
   * @returns {{ note: Note, accessRights: NoteAccessRights }} - note data and accessRights data
   */
  public async getNoteByHostname(hostname: string): Promise<{ note: Note, accessRights: NoteAccessRights }> {
    return await this.noteRepository.getNoteByHostname(hostname);
  }

  /**
   * Creates a new note and returns it
   *
   * @param content - Note content (Editor.js data)
   */
  public async createNote(content: NoteContent): Promise<Note> {
    return await this.noteRepository.createNote(content);
  }

  /**
   * Updates a content of existing note
   *
   * @param id - identifier of the note to update
   * @param content - Note content (Editor.js data)
   */
  public async updateNoteContent(id: string, content: NoteContent): Promise<void> {
    return await this.noteRepository.updateNoteContent(id, content);
  }
}
