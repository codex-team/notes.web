import type NoteSettingsRepository from '@/domain/noteSettings.repository.interface';
import type NotesSettings from '@/domain/entities/NotesSettings';
import type { NoteId } from './entities/Note';

/**
 * Note Service
 */
export default class NoteService {
  /**
   * Note repository
   */
  private readonly noteSettingsRepository: NoteSettingsRepository;

  /**
   * Note Service constructor
   *
   * @param noteSettingsRepository - Note repository instance
   */
  constructor(noteSettingsRepository: NoteSettingsRepository) {
    this.noteSettingsRepository = noteSettingsRepository;
  }

  /**
   * Get notesSettings
   *
   * @param id - Note id
   */
  public async getNotesSettingsById(id: NoteId): Promise<NotesSettings | null> {
    let result;

    try {
      result = await this.noteSettingsRepository.getNotesSettingsById(id);
    } catch (error) {
      throw new Error(`404 Not Found: We couldn't find ${id} note.`);
    }

    return result;
  }
}
