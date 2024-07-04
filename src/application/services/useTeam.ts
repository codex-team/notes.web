import type { InvitationHash } from '@/domain/entities/NoteSettings';
import type { TeamMember } from '@/domain/entities/Team';
import { teamService } from '@/domain/index';

interface useTeamComposableState {
  /**
   * Function for adding user to note's team by invitation hash
   * @param hash - invitation hash of the certain note
   * @returns Team member or null
   */
  joinNoteTeamByHash: (hash: InvitationHash) => Promise<TeamMember | null>;
}

export default function useTeam(): useTeamComposableState {
  /**
   * Function for adding user to note's team by invitation hash
   * @param hash - invitation hash of the certain note
   * @returns Team member or null
   */
  async function joinNoteTeamByHash(hash: InvitationHash): Promise<TeamMember | null> {
    return await teamService.joinNoteTeamByHash(hash);
  }

  return {
    joinNoteTeamByHash,
  };
}
