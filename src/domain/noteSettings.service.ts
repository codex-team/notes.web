import type NoteSettingsRepository from '@/domain/noteSettings.repository.interface';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from './entities/Note';
import NotFoundError from './entities/errors/NotFound';
import type { UserId } from './entities/User';
import type { MemberRole } from './entities/Team';

/**
 * Note Service
 */
export default class NoteService {
  /**
   * Note repository
   */
  private readonly noteSettingsRepository: NoteSettingsRepository;

  /**
   * Note Service constructor
   *
   * @param noteSettingsRepository - Note repository instance
   */
  constructor(noteSettingsRepository: NoteSettingsRepository) {
    this.noteSettingsRepository = noteSettingsRepository;
  }

  /**
   * Returns setting for a note with passed id
   *
   * @param id - Note id
   */
  public async getNoteSettingsById(id: NoteId): Promise<NoteSettings> {
    let result;

    try {
      result = await this.noteSettingsRepository.getNoteSettingsById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new Error(`404 Not Found: We couldn't find ${id} note.`);
      }

      throw error;
    }

    return result;
  }

  /**
   * Updates note settings
   *
   * @param id - Note id
   * @param data - Note settings data with new values
   * @returns { NoteSettings } updated note settings
   */
  public async patchNoteSettingsByNoteId(id: NoteId, data: Partial<NoteSettings>): Promise<NoteSettings> {
    let result;

    try {
      result = await this.noteSettingsRepository.patchNoteSettingsByNoteId(id, data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new Error(`404 Not Found: We couldn't find ${id} note.`);
      }

      throw error;
    }

    return result;
  }

  /**
   * Revoke invitation hash
   *
   * @param id - Note id
   * @returns { NoteSettings } updated note settings
   */
  public async regenerateInvitationHash(id: NoteId): Promise<NoteSettings> {
    let result;

    try {
      result = await this.noteSettingsRepository.regenerateInvitationHash(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new Error(`404 Not Found: We couldn't find ${id} note.`);
      }

      throw error;
    }

    return result;
  }

  /**
   * Patch team member role by user and note id
   *
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   */
  public async patchMemberRoleByUserId(id: NoteId, userId: UserId, newRole: MemberRole): Promise<MemberRole> {
    return await this.noteSettingsRepository.patchMemberRoleByUserId(id, userId, newRole);
  }

  /**
   *
   * @param id
   */
  public async deleteNote(id: NoteId): Promise<void> {
    return await this.noteSettingsRepository.deleteNote(id);
  }
}
