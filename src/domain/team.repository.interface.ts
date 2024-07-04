import type { InvitationHash } from '@/domain/entities/NoteSettings';
import type { TeamMember } from '@/domain/entities/Team';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface TeamRepositoryInterface {
  /**
   * Function for adding user to note's team by invitation hash
   * @param hash - invitation hash of the certain note
   * @returns Team member or null
   */
  joinNoteTeamByHash: (hash: InvitationHash) => Promise<TeamMember | null>;

}
