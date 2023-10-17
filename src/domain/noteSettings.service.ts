import type NoteSettingsRepository from '@/domain/noteSettings.repository.interface';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from './entities/Note';
import NotFoundError from './entities/errors/NotFound';

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
   * Returns setting for a note with passed id
   *
   * @param id - Note id
   */
  public async getNoteSettingsById(id: NoteId): Promise<NoteSettings | null> {
    let result;

    try {
      result = await this.noteSettingsRepository.getNoteSettingsById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new Error(`404 Not Found: We couldn't find ${id} note.`);
      }

      throw error;
    }

    return result;
  }
}
