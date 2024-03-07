import type NoteSettingsRepository from '@/domain/noteSettings.repository.interface';
import type { Team } from './entities/Team';
import type { NoteId } from './entities/Note';
import NotFoundError from './entities/errors/NotFound';

/**
 * Team Service
 */
export default class TeamService {
  private readonly repository: NoteSettingsRepository;

  /**
   * Team service constructor
   *
   * @param repository - note settings repository
   */
  constructor(repository: NoteSettingsRepository) {
    this.repository = repository;
  }

  /**
   * Returns all team members by note id
   *
   * @param id - Note id
   * @returns { Team } array of the TeamMember instaces
   */
  public async getTeamByNoteId(id: NoteId): Promise<Team> {
    let result;

    try {
      result = await this.repository.getTeamByNoteId(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new Error(`404 Not Found: We couldn't find team of ${id} note.`);
      }

      throw error;
    }

    return result;
  }
}
