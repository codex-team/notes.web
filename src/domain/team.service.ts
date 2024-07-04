import type TeamRepository from '@/domain/team.repository.interface';
import type { InvitationHash } from './entities/NoteSettings';
import type { TeamMember } from './entities/Team';

/**
 * Team service
 */
export default class TeamService {
  /**
   * Team repository
   */
  private readonly teamRepository: TeamRepository;

  constructor(teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  /**
   * Function for adding user to note's team by invitation hash
   * @param hash - invitation hash of the certain note
   * @returns Team member or null
   */
  public async joinNoteTeamByHash(hash: InvitationHash): Promise<TeamMember | null> {
    return this.teamRepository.joinNoteTeamByHash(hash);
  }
}
