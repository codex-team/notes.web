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
   * number of the current page
   */
  currentPage: Ref<number>;

  /**
   * Load next page of the notes
   */
  loadMoreNotes: () => Promise<NoteList>;

  /**
   * Load previous page of the notes
   */
  loadPreviousPage: () => Promise<NoteList>;
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
  let currentPage = ref(1);

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
  const loadMoreNotes = async (): Promise<NoteList> => {
    currentPage.value += 1;

    return await load(currentPage.value);
  };

  /**
   * Load previous page of the notes
   */
  const loadPreviousPage = async (): Promise<NoteList> => {
    currentPage.value -= 1;

    return await load(currentPage.value);
  };

  /**
   * Load first notes
   */
  onMounted(async () => {
    noteList.value = await load(1);
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
    currentPage,
    load,
    loadMoreNotes,
    loadPreviousPage,
  };
}
