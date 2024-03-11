import type { User } from './User.js';

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
   * Team member user
   */
  user: User;
}

export type Team = TeamMember[];
