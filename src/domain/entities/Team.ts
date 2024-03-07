import type { NoteId } from './Note.js';
import type { UserId } from './User.js';

/**
 * Class representing a team entity
 * Team is a relation between note and user, which shows what user can do with note
 */
export interface TeamMember {
  /**
   * Team relation id
   */
  id: number;

  /**
   * Note ID
   */
  noteId: NoteId;

  /**
   * Team member user id
   */
  userId: UserId;
}

export type Team = TeamMember[];
