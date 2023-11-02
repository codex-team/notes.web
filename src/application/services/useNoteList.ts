import type { NoteList } from '@/domain/entities/NoteList';
import { noteListService } from '@/domain/index';
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { useAppState } from './useAppState';

/**
 * Note list hook state
 */
interface UseNoteListComposableState {
  /**
   * NoteSettings ref
   */
  noteList: Ref<NoteList| undefined>;

  /**
   * Get Note List
   */
  load: () => Promise<void>

}

/**
 * Application service for working with the Note list
 */
export default function (): UseNoteListComposableState {
  /**
   * NoteList ref
   */
  const noteList = ref<NoteList | undefined>();


  /**
   * Get note list
   */
  const load = async (): Promise<void> => {
    /**
     * Get user id
     */
    const user = useAppState().user.value;


    /**
     * If user is logged in, load note list
     */

    if (user !== undefined && user !== null) {
      noteList.value = await noteListService.getNoteListByCreatorId(user.id, 1);
    } else {
      console.log('User is not logged');
    }
  };

  onMounted(async () => {
    await load();
  });

  watch(useAppState().user, async () => {
    await load();
  });

  return {

    noteList,
    load,
  };
}