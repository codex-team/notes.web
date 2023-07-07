import { Ref, ref } from 'vue';
import Note from '@/domain/entities/Note';
import { noteService } from '@/domain/index';

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
   * Get note
   *
   * @param id - Note id
   */
  const load = async (id: number): Promise<void> => {
    note.value = await noteService.getNoteById(id);
  };

  return {
    note,
    load,
  };
}

