import type { NoteList } from '@/domain/entities/NoteList';
import { noteListService } from '@/domain/index';
import { isEmpty } from '@/infrastructure/utils/empty';
import type { Ref } from 'vue';
import { onMounted, onUnmounted, ref } from 'vue';

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
   * @param page - number of pages
   */
  load: (page: number) => Promise<NoteList>;

  /**
   * Displays if there are more notes to be displayed
   * @todo move this variable to api (also portion size would be removed)
   */
  hasMoreNotes: Ref<boolean>;

  /**
   * Load next page of the notes
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
   * Number of the notes to be displayed on one page
   * When next page is loaded available notes will be appended to noteList
   */
  const postionSize = 30;

  /**
   * Used for user to know if he can load more notes
   */
  const hasMoreNotes = ref(true);

  /**
   * Number of the current page
   * On mount it is 0 because we will use load more notes from page 1
   */
  let currentPage = 0;

  /**
   * Get note list
   * @param page - number of pages
   */
  const load = async (page: number): Promise<NoteList> => {
    return await noteListService.getNoteList(page);
  };

  /**
   * Load next page of the notes
   */
  const loadMoreNotes = async (): Promise<void> => {
    currentPage += 1;

    const loadedNotes = await load(currentPage);

    if (loadedNotes.items.length !== postionSize) {
      hasMoreNotes.value = false;
    }

    /**
     * Merge loaded notes from next page with notes that user already has
     */
    if (noteList.value !== null) {
      noteList.value.items = [...noteList.value.items, ...loadedNotes.items];
    } else {
      noteList.value = loadedNotes;
    }
  };

  /**
   * Load first notes
   */
  onMounted(async () => {
    await loadMoreNotes();
  });

  /**
   * Clear binary data
   * @todo - move this logic to the separate service
   */
  onUnmounted(() => {
    if (isEmpty(noteList.value) || isEmpty(noteList.value.items)) {
      return;
    }
    for (const note of noteList.value.items) {
      if (note.cover === null) {
        continue;
      }
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      URL.revokeObjectURL(note.cover);
    }
  });

  return {
    noteList,
    hasMoreNotes,
    load,
    loadMoreNotes,
  };
}
