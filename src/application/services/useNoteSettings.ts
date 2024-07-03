import { ref, type Ref } from 'vue';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { Note, NoteId } from '@/domain/entities/Note';
import { noteSettingsService, noteService } from '@/domain';
import type { UserId } from '@/domain/entities/User';
import type { MemberRole } from '@/domain/entities/Team';
import { useRouter } from 'vue-router';

/**
 * Note settings hook state
 */
interface UseNoteSettingsComposableState {
  /**
   * NoteSettings ref
   */
  noteSettings: Ref<NoteSettings | null>;

  /**
   * Parent note, undefined if it's a root note
   */
  parentNote: Ref<Note | undefined>;

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
  revokeHash: (id: NoteId) => Promise<void>;

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
   */
  setParent: (id: NoteId, newParentURL: string) => Promise<void>;
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
   * Parent note
   *
   * undefined by default
   */
  const parentNote = ref<Note | undefined>();

  /**
   * Router instance used to replace the current route with note id
   */
  const router = useRouter();

  /**
   * Get note settings
   * @param id - Note id
   */
  const load = async (id: NoteId): Promise<void> => {
    noteSettings.value = await noteSettingsService.getNoteSettingsById(id);
    const response = await noteService.getNoteById(id);

    parentNote.value = response.parentNote;
  };

  /**
   * Update field isPublic in note settings
   * @param id - Note id
   * @param newIsPublicValue - new isPublic
   */
  async function updateIsPublic(id: NoteId, newIsPublicValue: boolean): Promise<void> {
    const { isPublic } = await noteSettingsService.patchNoteSettingsByNoteId(id, { isPublic: newIsPublicValue });

    /**
     * If note settings were not loaded till this moment for some reason, do nothing
     */
    if (noteSettings.value) {
      noteSettings.value.isPublic = isPublic;
    }
  }

  /**
   * Revoke invitation hash
   * @param id - Note id
   */
  const revokeHash = async (id: NoteId): Promise<void> => {
    const { invitationHash } = await noteSettingsService.regenerateInvitationHash(id);

    /**
     * Check if note setting is not empty
     */
    if (noteSettings.value) {
      noteSettings.value = { ...noteSettings.value,
        invitationHash };
    }
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

    void router.push({
      name: 'home',
    });
  };

  /**
   * Set parent for the note
   * @param id - Child note id
   * @param newParentURL - New parent note URL
   */
  const setParent = async (id: NoteId, newParentURL: string): Promise<void> => {
    try {
      parentNote.value = await noteService.setParentByUrl(id, newParentURL);
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
    }
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

  return {
    updateCover,
    setParent,
    parentNote,
    noteSettings,
    load,
    updateIsPublic,
    revokeHash,
    changeRole,
    deleteNoteById,
  };
}
