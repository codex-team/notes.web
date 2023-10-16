import type NoteRepository from '@/domain/note.repository.interface';
import type { Note, NoteContent } from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';

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
   * Returns a note by its id
   *
   * @param id - Note id
   * @throws NotFoundError
   */
  public async getNoteById(id: string): Promise<Note> {
    return await this.noteRepository.getNoteById(id);
  }

  /**
   * Get note by hostname
   *
   * @param hostname - Custom hostname linked with a note
   * @returns { Note | null } - Note data
   */
  public async getNoteByHostname(hostname: string): Promise<Note | null> {
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


  /**
   * Get notesSettings
   *
   * @param publicId - Note publicId
   * @returns { NotesSettings | null } - Note data
   *
   * @todo move to the Note Settings service
   */
  public async getNotesSettingsById(publicId: string): Promise<NotesSettings | null> {
    return await this.noteRepository.getNotesSettingsById(publicId);
  }
}
