import type { Team } from './Team';

/**
 * Used to invite users to team
 */
export type InvitationHash = string;

/**
 * NoteSettings entity
 */
export default interface NoteSettings {
  /**
   * NoteSettings id
   */
  id: number;

  /**
   * Custom hostname
   */
  customHostname: string;

  /**
   * Is note enabled
   */
  isPublic: boolean;

  /**
   * Invitation hash
   */
  invitationHash: InvitationHash;

  /**
   * Team members
   */
  team: Team;

  cover: string;
}
