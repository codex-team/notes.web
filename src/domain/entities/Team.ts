import type { User } from './User.js';

export enum MemberRole {
  /**
   * Team member can only read notes
   */
  Read = 0,

  /**
   * Team member can read and write notes
   */
  Write = 1
}

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

  /**
   * Team member role, show what user can do with note
   */
  role: MemberRole;
}

export type Team = TeamMember[];
