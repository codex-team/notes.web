import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from './entities/Note';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteSettingsRepositoryInterface {
  /**
   * Returns setting for a note with passed id
   *
   * @param  id - note  id
   * @throws Will throw an error if id is not found.
   * @returns NoteSettings - NoteSettings instance
   */
  getNoteSettingsById(id: NoteId): Promise<NoteSettings>;

  /**
   * Updates note settings
   *
   * @param id - note id
   * @param data - note settings data with new values
   * @returns updated note settings
   */
  patchNoteSettingsByNoteId(id: NoteId, data: Partial<NoteSettings>): Promise<NoteSettings>;

  /**
   * Revoke invitation hash
   *
   * @param id - note id
   * @returns updated note settings
   */
  regenerateInvitationHash(id: NoteId): Promise<NoteSettings>;

  /**
   * Returns all team members by note id
   *
   * @param  id - note  id
   * @returns NoteSettings - NoteSettings instance
   */
  getTeamByNoteId(id: NoteId): Promise<NoteSettings>;
}
