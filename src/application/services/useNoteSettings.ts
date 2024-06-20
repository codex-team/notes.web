import { ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from '@/domain/entities/Note';
import { authService, noteSettingsService } from '@/domain';
import type { UserId } from '@/domain/entities/User';
import type { MemberRole } from '@/domain/entities/Team';
import type { TeamMember } from '@/domain/entities/TeamMember';
import useAuth from './useAuth';

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
   * Join note by hash
   * @param hash - invitation hash
   * @returns {TeamMember}
   */
  joinNote: (hash: string) => Promise<TeamMember | null>;
}

/**
 * Application service for working with the Note settings
 */
export default function (): UseNoteSettingsComposableState {
  /**
   * NoteSettings ref
   */
  const noteSettings = ref<NoteSettings | null>(null);
  const teamMember = ref<TeamMember | null>(null);

  /**
   * Router instance used to replace the current route with note id
   */
  const router = useRouter();

  const route = useRoute();

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

  async function joinNote(hash: string): Promise<TeamMember> {
    if (!authService.isAuthorized()) {
      void router.push('/');
      void router.push('/');

      if (route.path === '/') {
        void useAuth().showGoogleAuthPopup();
        // setTimeout(() => {
        //
        // //router.push({ name: 'join', params: { id: hash }})
        // }, 4000)
      }
    }

    teamMember.value = await noteSettingsService.joinNoteTeam(hash);
    teamMember.value = await noteSettingsService.joinNoteTeam(hash);

    return teamMember.value as TeamMember;
  }

  return {
    noteSettings,
    load,
    updateIsPublic,
    revokeHash,
    changeRole,
    deleteNoteById,
    joinNote,
  };
}
