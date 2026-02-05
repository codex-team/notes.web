import type NoteSettingsRepository from '@/domain/noteSettings.repository.interface';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from './entities/Note';
import NotFoundError from './entities/errors/NotFound';
import type { UserId } from './entities/User';
import type { MemberRole } from './entities/Team';
import type NoteAttachmentUploaderRepository from './noteAttachmentUploader.repository.interface';

/**
 * Note Service
 */
export default class NoteSettingsService {
  /**
   * Note settings repository
   */
  private readonly noteSettingsRepository: NoteSettingsRepository;

  private readonly noteAttachmentRepository: NoteAttachmentUploaderRepository;

  /**
   * Note Service constructor
   * @param noteSettingsRepository - Note settings repository instance
   * @param noteAttachmentRepository - Repository to work with note attachments
   */
  constructor(noteSettingsRepository: NoteSettingsRepository, noteAttachmentRepository: NoteAttachmentUploaderRepository) {
    this.noteSettingsRepository = noteSettingsRepository;
    this.noteAttachmentRepository = noteAttachmentRepository;
  }

  /**
   * Returns setting for a note with passed id
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
   * @param id - Note id
   * @param data - Note settings data with new values
   * @returns updated note settings
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
   * Update note cover picture
   * @param id - note id
   * @param data - picture binary data
   */
  public async updateCover(id: NoteId, data: Blob): Promise<NoteSettings> {
    const key = await this.noteAttachmentRepository.upload(id, data);

    return await this.patchNoteSettingsByNoteId(id, { cover: key });
  }

  /**
   * Revoke invitation hash
   * @param id - Note id
   * @returns updated note settings
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
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   */
  public async patchMemberRoleByUserId(id: NoteId, userId: UserId, newRole: MemberRole): Promise<MemberRole> {
    return await this.noteSettingsRepository.patchMemberRoleByUserId(id, userId, newRole);
  }

  /**
   * Delete note by it's id
   * @param id - Note id
   */
  public async deleteNote(id: NoteId): Promise<void> {
    return await this.noteSettingsRepository.deleteNote(id);
  }

  /**
   * Delete team member by user id
   * @param id - Note id
   * @param userId - User id
   */
  public async removeMemberByUserId(id: NoteId, userId: UserId): Promise<void> {
    return await this.noteSettingsRepository.removeMemberByUserId(id, userId);
  }
}
