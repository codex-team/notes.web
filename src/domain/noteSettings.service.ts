import type NoteSettingsRepository from '@/domain/noteSettings.repository.interface';
import type NotesSettings from '@/domain/entities/NotesSettings';

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
   * @param publicId - Note publicId
   * @returns { NotesSettings | null } - Note data
   *
   * @todo move to the Note Settings service
   */
  public async getNotesSettingsById(publicId: string): Promise<NotesSettings | null> {
    return await this.noteSettingsRepository.getNotesSettingsById(publicId);
  }
}
