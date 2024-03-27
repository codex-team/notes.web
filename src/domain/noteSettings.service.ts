import type NoteSettingsRepository from '@/domain/noteSettings.repository.interface';
import type NoteRepository from '@/domain/note.repository.interface';
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
   * Note settings repository
   */
  private readonly noteSettingsRepository: NoteSettingsRepository;

  /**
   * Note repository
   */
  private readonly noteRepository: NoteRepository;

  /**
   * Note Service constructor
   *
   * @param noteSettingsRepository - Note settings repository instance
   * @param noteRepository - Note repository instance
   */
  constructor(noteSettingsRepository: NoteSettingsRepository, noteRepository: NoteRepository) {
    this.noteSettingsRepository = noteSettingsRepository;
    this.noteRepository = noteRepository;
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
   * Set new parent for the note
   *
   * @param id - Note id
   * @param parentURL - link to the new parent note
   */
  public async updateParent(id: NoteId, parentURL: string): Promise<void> {
    // Regex matches any characters between '/note/' and the next slash or end of string
    const regex = /\/note\/([^/]+)/;

    const matches = parentURL.match(regex);

    if (matches === null) {
      throw new Error('Invalid parent URL');
    }

    // Extracts the ID from the URL. The ID is matches[1] as matches[0] is the full match
    const parentId = matches[1];

    const noteIdPattern = /^[a-zA-Z0-9-_]{10}$/;

    if (!noteIdPattern.test(parentId)) {
      throw new Error('Invalid parent ID');
    }

    const isUpdated = await this.noteRepository.updateParent(id, parentId);

    if (!isUpdated) {
      throw new Error('Parent was not updated');
    }
  }
}
