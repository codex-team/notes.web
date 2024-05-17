import type NoteSettingsRepositoryInterface from '@/domain/noteSettings.repository.interface';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { NoteId } from '@/domain/entities/Note';
import type { MemberRole } from '@/domain/entities/Team';
import type { UserId } from '@/domain/entities/User';

/**
 * Note settings repository
 */
export default class NoteSettingsRepository implements NoteSettingsRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Note repository constructor
   * @param notesApiTransport - notes api transport instance
   */
  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Returns setting for a note by note ID
   * @param id - Note id
   * @returns - NoteSettings instance
   */
  public async getNoteSettingsById(id: NoteId): Promise<NoteSettings> {
    return await this.transport.get<NoteSettings>('/note-settings/' + id);
  }

  /**
   * Updates note settings
   * @param id - Note id
   * @param data - Note settings data with new values
   * @returns updated note settings
   */
  public async patchNoteSettingsByNoteId(id: NoteId, data: Partial<NoteSettings>): Promise<NoteSettings> {
    return await this.transport.patch<NoteSettings>('/note-settings/' + id, data);
  }

  /**
   * Revoke invitation hash
   * @param id - Note id
   * @returns updated note settings
   */
  public async regenerateInvitationHash(id: NoteId): Promise<NoteSettings> {
    return await this.transport.patch<NoteSettings>(`/note-settings/${id}/invitation-hash`);
  }

  /**
   * Patch team member role by user and note id
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   * @returns updated role
   */
  public async patchMemberRoleByUserId(id: NoteId, userId: UserId, newRole: MemberRole): Promise<MemberRole> {
    return await this.transport.patch<MemberRole>(`/note-settings/${id}/team`, { userId,
      newRole });
  }

  /**
   * Delete note by it's id
   *
   * @param id - Note id
   */
  public async deleteNote(id: NoteId): Promise<void> {
    await this.transport.delete<boolean>(`/note/` + id);
  }
}
