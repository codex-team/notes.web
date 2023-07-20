import { Ref, ref } from 'vue';
import Note from '../../domain/entities/Note';
import { noteService } from '../../domain';

/**
 * Note hook state
 */
interface UseNoteComposableState {
  /**
   * Note ref
   */
  note: Ref<Note | null>;

  /**
   * Load note
   *
   * @param id
   */
  load: (id: number) => Promise<void>;

  /**
   * Is loading
   */
  isLoading: Ref<boolean>;
}

/**
 * useNote hook
 *
 * @returns { UseNoteComposableState } - Note hook state
 */
export default function (): UseNoteComposableState {
  /**
   * Note ref
   */
  const note = ref<Note | null>(null);

  /**
   * Is loading
   */
  const isLoading = ref<boolean>(false);

  /**
   * Get note
   *
   * @param id - Note id
   */
  const load = async (id: number): Promise<void> => {
    isLoading.value = true;
    note.value = await noteService.getNoteById(id);
    isLoading.value = false;
  };

  return {
    note,
    load,
    isLoading,
  };
}

