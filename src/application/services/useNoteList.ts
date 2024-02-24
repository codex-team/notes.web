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
   * NoteList ref
   */
  noteList: Ref<NoteList | null>;

  /**
   * Get Note List
   *
   * @param page - number of pages
   */
  load: (page: number) => Promise<void>;

  /**
   * Load more notes
   */
  loadMoreNotes: () => Promise<void>;
}

/**
 * Application service for working with the Note list
 */
export default function (): UseNoteListComposableState {
  /**
   * NoteList ref
   */
  const noteList = ref<NoteList | null>(null);

  /**
   * Current page
   */
  let currentPage = 1;

  /**
   * Get note list
   *
   * @param page - number of pages
   */
  const load = async (page: number): Promise<void> => {
    /**
     * Get user id
     */
    const user = useAppState().user.value;

    /**
     * If user is logged in, load note list
     */
    if (user) {
      noteList.value = await noteListService.getNoteListByCreatorId(user.id, page);
    }
  };

  /**
   * Load more notes
   */
  const loadMoreNotes = async (): Promise<void> => {
    currentPage += 1;
    await load(currentPage);
  };

  onMounted(async () => {
    await load(1);
  });

  watch(useAppState().user, async () => {
    await load(1);
  });

  return {
    noteList,
    load,
    loadMoreNotes,
  };
}
