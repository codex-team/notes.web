import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from '@/domain/entities/Note';
import { noteSettingsService } from '@/domain';
import { authService } from '@/domain';
import type { TeamMember } from '@/domain/entities/TeamMember';

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
   * @param hash - hash
   * @returns string
   */
  joinNote: (hash: string) => Promise<TeamMember>;
}

/**
 * Application service for working with the Note settings
 */
export default function (): UseNoteSettingsComposableState {
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
   *
   * @todo - to be implemented as an auth guard at router level
   *
   * @param hash - invitation hash
   */
  async function joinNote(hash: string): Promise<TeamMember> {
    if (!authService.repository.hasSession()) {
      void router.push('/');
    }

    teamMember.value = await noteSettingsService.joinNoteTeam(hash);

    return teamMember.value as TeamMember;
  }

  return {
    noteSettings,
    load,
    update,
    revokeHash,
    joinNote,
  };
}
