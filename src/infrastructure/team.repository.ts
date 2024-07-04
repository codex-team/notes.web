import type TeamRepositoryInterface from '@/domain/team.repository.interface';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { InvitationHash } from '@/domain/entities/NoteSettings';
import type { TeamMember } from '@/domain/entities/Team';

/**
 * Team repository
 */
export default class TeamRepository implements TeamRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;
  /**
   * Note repository constructor
   * @param notesApiTransport - notes api transport instance
   */
  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Function for adding user to note's team by invitation hash
   * @param hash - invitation hash of the certain note
   * @returns Team member or null
   */
  public async joinNoteTeamByHash(hash: InvitationHash): Promise<TeamMember | null> {
    let res: TeamMember | null = null;

    res = await this.transport.post<TeamMember | null>('/join/' + hash, {});

    return res;
  }
}
