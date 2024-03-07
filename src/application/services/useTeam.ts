import type { NoteId } from '@/domain/entities/Note';
import type { Team } from '@/domain/entities/Team';
import { teamService } from '@/domain/index';
import type { Ref } from 'vue';
import { ref } from 'vue';

/**
 * Team hook state
 */
interface UseTeamComposableState {
  /**
   * Team ref
   */
  team: Ref<Team | null>;

  /**
   * Get Team
   *
   * @param id - id of the note
   */
  loadTeam: (id: NoteId) => Promise<void>;
}

/**
 * Application service for working with the Team
 */
export default function (): UseTeamComposableState {
  /**
   * Team ref
   */
  const team = ref<Team | null>(null);

  /**
   * Get all team members by note id
   *
   * @param id - Note id
   */
  const loadTeam = async (id: NoteId): Promise<void> => {
    team.value = await teamService.getTeamByNoteId(id);
  };

  // onMounted(async() => {
  //   await loadTeam();
  // })

  return {
    team,
    loadTeam,
  };
}
