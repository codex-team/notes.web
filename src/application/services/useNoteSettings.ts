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
   * Load note settings
   * @param id - note id
   */
  load: (id: NoteId) => Promise<void>;

  /**
   * Update field isPublic in note settings
   * @param id - note id
   * @param newIsPublicValue - new value for isPublic field
   */
  updateIsPublic: (id: NoteId, newIsPublicValue: boolean) => Promise<void>;

  /**
   * Revoke invitation hash
   * @param id - note id
   */
  revokeHash: (id: NoteId) => Promise<string>;

  /**
   * Patch team member role by user and note id
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   */
  changeRole: (id: NoteId, userId: UserId, newRole: MemberRole) => Promise<void>;

  /**
   * Delete note by it's id
   * @param id - Note id
   */
  deleteNoteById: (id: NoteId) => Promise<void>;

  /**
   * Update note cover
   * @param id - note id
   * @param data - picture binary data
   */
  updateCover: (id: NoteId, data: Blob) => Promise<void>;

  /**
   * Set parent for the note
   * @param id - Child note id
   * @param newParentURL - New parent note URL
   * @returns the new parent note
   */
  setParent: (id: NoteId, newParentURL: string) => Promise<Note>;

  /**
   * Delete team member by user id
   * @param id - Note id
   * @param userId - User id
   * @returns true if user was removed
   */
  removeMemberByUserId: (id: NoteId, userId: UserId) => Promise<boolean>;
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
   * Get note settings
   * @param id - Note id
   */
  const load = async (id: NoteId): Promise<void> => {
    noteSettings.value = await noteSettingsService.getNoteSettingsById(id);
  };

  /**
   * Update field isPublic in note settings
   * @param id - Note id
   * @param newIsPublicValue - new isPublic
   */
  async function updateIsPublic(id: NoteId, newIsPublicValue: boolean): Promise<void> {
    const settings = noteSettings.value;

    /**
     * Switch right away, revert if the request fails
     */
    if (settings) {
      settings.isPublic = newIsPublicValue;
    }

    try {
      await noteSettingsService.patchNoteSettingsByNoteId(id, { isPublic: newIsPublicValue });
    } catch (error) {
      if (settings) {
        settings.isPublic = !newIsPublicValue;
      }

      throw error;
    }
  }

  /**
   * Revoke invitation hash
   * @param id - Note id
   */
  const revokeHash = async (id: NoteId): Promise<string> => {
    const { invitationHash } = await noteSettingsService.regenerateInvitationHash(id);

    /**
     * Check if note setting is not empty
     */
    if (noteSettings.value) {
      noteSettings.value = { ...noteSettings.value,
        invitationHash };
    }

    return invitationHash;
  };

  /**
   * Patch team member role by user and note id
   * @param id - Note id
   * @param userId - id of the user whose role is to be changed
   * @param newRole - new role
   * @returns updated note settings
   */
  const changeRole = async (id: NoteId, userId: UserId, newRole: MemberRole): Promise<void> => {
    await noteSettingsService.patchMemberRoleByUserId(id, userId, newRole);
  };

  /**
   * Delete note by it's id
   * @param id - Note id
   */
  const deleteNoteById = async (id: NoteId): Promise<void> => {
    await noteSettingsService.deleteNote(id);
  };

  /**
   * Set parent for the note
   * @param id - Child note id
   * @param newParentURL - New parent note URL
   */
  async function setParent(id: NoteId, newParentURL: string): Promise<Note> {
    return await noteService.setParentByUrl(id, newParentURL);
  };

  /**
   * Update note cover picture
   * @param id - note id
   * @param data - picture binary data
   */
  const updateCover = async (id: NoteId, data: Blob): Promise<void> => {
    const { cover } = await noteSettingsService.updateCover(id, data);

    if (noteSettings.value) {
      noteSettings.value = {
        ...noteSettings.value,
        cover,
      };
    }
  };

  /**
   * Delete team member by user id
   * @param id - Note id
   * @param userId - User id
   * @returns true if user was removed
   */
  const removeMemberByUserId = async (id: NoteId, userId: UserId): Promise<boolean> => {
    return await noteSettingsService.removeMemberByUserId(id, userId);
  };

  return {
    updateCover,
    setParent,
    noteSettings,
    load,
    updateIsPublic,
    revokeHash,
    changeRole,
    deleteNoteById,
    removeMemberByUserId,
  };
}
