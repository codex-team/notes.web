import type NoteRepository from '@/domain/note.repository.interface';
import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';
import type { NoteDTO } from './entities/NoteDTO';

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
   * @returns {{ note: Note, accessRights: NoteAccessRights, parentNote: Note | undefined }} - note data, accessRights data
   * and parent note data if exists
   */
  public async getNoteById(id: string): Promise<NoteDTO> {
    return await this.noteRepository.getNoteById(id);
  }

  /**
   * Get note and accessRights by hostname
   *
   * @param hostname - Custom hostname linked with a note
   * @returns {{ note: Note, accessRights: NoteAccessRights }} - note data and accessRights data
   */
  public async getNoteByHostname(hostname: string): Promise<{ note: Note; accessRights: NoteAccessRights }> {
    return await this.noteRepository.getNoteByHostname(hostname);
  }

  /**
   * Creates a new note and returns it
   *
   * @param content - Note content (Editor.js data)
   * @param parentId - Id of the parent note. If omitted, then it's a root note
   */
  public async createNote(content: NoteContent, parentId?: NoteId): Promise<Note> {
    return await this.noteRepository.createNote(content, parentId);
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

  /**
   * Unlink note from parent
   *
   * @param id - Note identifier
   */
  public async unlinkParent(id: NoteId): Promise<void> {
    return await this.noteRepository.unlinkParent(id);
  }
}
