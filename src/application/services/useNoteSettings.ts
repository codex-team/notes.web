import { ref, type Ref } from 'vue';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { Note, NoteId } from '@/domain/entities/Note';
import { noteSettingsService, noteService } from '@/domain';
import type { UserId } from '@/domain/entities/User';
import type { MemberRole } from '@/domain/entities/Team';

/**
 * Note settings hook state
 */
interface UseNoteSettingsComposableState {
  /**
   * NoteSettings ref
   */
  noteSettings: Ref<NoteSettings | null>;

  /**
   * Instance of the parent note, undefined if there is no parent note
   */
  parentNote: Ref<Note | undefined>;

  /**
   * Load note settings
   *
   * @param id - note id
   */
  load: (id: NoteId) => Promise<void>;

  /**
   * Update note settings
   *
   * @param id - note id
   * @param data - note settings data with new values
   */
  update: (id: NoteId, data: Partial<NoteSettings>) => Promise<void>;

  /**
   * Revoke invitation hash
   *
   * @param id - note id
   */
  revokeHash: (id: NoteId) => Promise<void>;

  /**
   * Patch team member role by user and note id
   *
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   */
  changeRole: (id: NoteId, userId: UserId, newRole: MemberRole) => Promise<void>;

  /**
   * Set new parent note
   *
   * @param id - id of the current note
   * @param newParentURL - link to the new parent note
   */
  updateParent: (id: NoteId, newParentURL: string) => Promise<void>;
}

/**
 * Application service for working with the Note settings
 */
export default function (): UseNoteSettingsComposableState {
  /**
   * NoteSettings ref
   */
  const noteSettings = ref<NoteSettings | null>(null);

  /**
   * Instance of the parent note, undefined if there is no parent note
   */
  const parentNote = ref<Note | undefined>(undefined);

  /**
   * Get note settings and parent note
   *
   * @param id - Note id
   */
  const load = async (id: NoteId): Promise<void> => {
    noteSettings.value = await noteSettingsService.getNoteSettingsById(id);
    parentNote.value = (await noteService.getNoteById(id)).parentNote;
  };

  /**
   * Update note settings
   *
   * @param id - Note id
   * @param data - Note settings data with new values
   */
  const update = async (id: NoteId, data: Partial<NoteSettings>): Promise<void> => {
    noteSettings.value = await noteSettingsService.patchNoteSettingsByNoteId(id, data);
    parentNote.value = (await noteService.getNoteById(id)).parentNote;
  };

  /**
   * Revoke invitation hash
   *
   * @param id - Note id
   */
  const revokeHash = async (id: NoteId): Promise<void> => {
    const { invitationHash } = await noteSettingsService.regenerateInvitationHash(id);

    /**
     * Check if note setting is not empty
     */
    if (noteSettings.value) {
      noteSettings.value = { ...noteSettings.value, invitationHash };
    }
  };

  /**
   * Patch team member role by user and note id
   *
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   * @returns updated note settings
   */
  const changeRole = async (id: NoteId, userId: UserId, newRole: MemberRole): Promise<void> => {
    await noteSettingsService.patchMemberRoleByUserId(id, userId, newRole);
  };

  /**
   * Set new parent note
   *
   * @param id - id of the current note
   * @param newParentURL - link to the new parent note
   */
  const updateParent = async (id: NoteId, newParentURL: NoteId): Promise<void> => {
    try {
      await noteSettingsService.updateParent(id, newParentURL);
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
      throw error;
    }
  };

  return {
    noteSettings,
    load,
    update,
    revokeHash,
    changeRole,
    updateParent,
    parentNote,
  };
}
