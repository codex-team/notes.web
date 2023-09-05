import type NoteRepository from '@/domain/note.repository.interface';
import type Note from '@/domain/entities/Note';
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
   * Get note
   *
   * @param publicId - Note publicId
   * @returns { Note | null } - Note data
   */
  public async getNoteById(publicId: string): Promise<Note | null> {
    return await this.noteRepository.getNoteById(publicId);
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
   * Loads note completion suggested by AI based on note content
   *
   * @param content - note content
   */
  public async fetchSuggestions(content: string): Promise<string> {
    return await this.noteRepository.fetchSuggestions(content);
  }

  /**
   * Get notesSettings
   *
   * @param publicId - Note publicId
   * @returns { NotesSettings | null } - Note data
   */
  public async getNotesSettingsById(publicId: string): Promise<NotesSettings | null> {
    return await this.noteRepository.getNotesSettingsById(publicId);
  }
}
