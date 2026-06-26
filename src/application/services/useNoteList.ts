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

  /**
   * Loading state
   */
  isLoading: Ref<boolean>;
}

/**
 * Application service for working with the Note list
 * @param onlyCreatedByUser - if true, returns notes created by the user
 */
export default function (onlyCreatedByUser = false): UseNoteListComposableState {
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
   * Loading state
   */
  const isLoading = ref(false);

  /**
   * Get note list (metadata only, covers are not downloaded)
   * @param page - number of pages
   */
  const load = async (page: number): Promise<NoteList> => {
    isLoading.value = true;

    const list = await noteListService.getNoteList(page, onlyCreatedByUser);

    isLoading.value = false;

    return list;
  };

  /**
   * Load cover images for all notes in the list in the background
   * Updates each note's cover reactively as it arrives
   */
  const loadCovers = async (): Promise<void> => {
    if (isEmpty(noteList.value)) {
      return;
    }

    const list = noteList.value;
    const items = list.items;

    await Promise.all(items.map(async (item, index) => {
      /**
       * If cover is null, the note has no cover image
       */
      if (item.cover === null) {
        return;
      }

      /**
       * If cover is already a blob URL, it was already loaded
       */
      if (item.cover.startsWith('blob:')) {
        return;
      }

      const url = await noteListService.loadCover(item.id, item.cover);

      if (url !== null) {
        /**
         * Update the specific note's cover reactively so the card renders the image
         */
        list.items[index] = {
          ...item,
          cover: url,
        };
      }
    }));
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

    /**
     * Kick off cover downloads in the background
     * List is already rendered, covers will appear one by one as they load
     */
    loadCovers().catch(console.error);
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
    isLoading,
  };
}
