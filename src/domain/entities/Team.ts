import type { NoteId } from './Note.js';

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
  userId: number;
}

export type Team = TeamMember[];
