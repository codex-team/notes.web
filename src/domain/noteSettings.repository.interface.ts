import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from './entities/Note';
import type { UserId } from './entities/User';
import type { MemberRole } from './entities/Team';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteSettingsRepositoryInterface {
  /**
   * Returns setting for a note with passed id
   * @param  id - note  id
   * @throws Will throw an error if id is not found.
   * @returns NoteSettings - NoteSettings instance
   */
  getNoteSettingsById(id: NoteId): Promise<NoteSettings>;

  /**
   * Updates note settings
   * @param id - note id
   * @param data - note settings data with new values
   * @returns updated note settings
   */
  patchNoteSettingsByNoteId(id: NoteId, data: Partial<NoteSettings>): Promise<NoteSettings>;

  /**
   * Revoke invitation hash
   * @param id - note id
   * @returns updated note settings
   */
  regenerateInvitationHash(id: NoteId): Promise<NoteSettings>;

  /**
   * Patch team member role by user and note id
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   */
  patchMemberRoleByUserId(id: NoteId, userId: UserId, newRole: MemberRole): Promise<MemberRole>;

  /**
   * Delete note by it's id
   * @param id - Note id
   */
  deleteNote(id: NoteId): Promise<void>;

  /**
   * Delete team member by user id
   * @param id - Note id
   * @param userId - User id
   * @returns true if user was removed
   */
  removeMemberByUserId(id: NoteId, userId: UserId): Promise<boolean>;
}
