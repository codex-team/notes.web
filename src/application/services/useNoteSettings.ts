import { ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from '@/domain/entities/Note';
import { noteSettingsService } from '@/domain';
import type { TeamMember } from '@/domain/entities/TeamMember';
import { authService } from '@/domain';
import useAuth from '@/application/services/useAuth.ts';

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
   * Join note by hash
   *
   * @param hash - invitation hash
   * @returns string
   */
  joinNote: (hash: string) => Promise<TeamMember | null>;
}

/**
 * Application service for working with the Note settings
 */
export default function (): UseNoteSettingsComposableState {
  const route = useRoute();
  const router = useRouter();
  /**
   * NoteSettings ref
   */
  const noteSettings = ref<NoteSettings | null>(null);
  const teamMember = ref<TeamMember | null>(null);

  /**
   * Get note settings
   *
   * @param id - Note id
   */
  const load = async (id: NoteId): Promise<void> => {
    noteSettings.value = await noteSettingsService.getNoteSettingsById(id);
  };

  /**
   * Update note settings
   *
   * @param id - Note id
   * @param data - Note settings data with new values
   */
  const update = async (id: NoteId, data: Partial<NoteSettings>): Promise<void> => {
    noteSettings.value = await noteSettingsService.patchNoteSettingsByNoteId(id, data);
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
   * Join notex team when authenticated
   * @param hash - invitation hash
   */
  async function joinNote(hash: string): Promise<TeamMember> {
    if (!authService.isAuthorized()) {
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

    return teamMember.value;
  }

  return {
    noteSettings,
    load,
    update,
    revokeHash,
    joinNote,
  };
}
