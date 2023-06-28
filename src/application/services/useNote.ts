import { Ref, ref } from 'vue';
import Note from '../../domain/entities/Note';
import NoteService from '../../domain/note.service';

/**
 * Note hook interface
 */
interface NoteHook {
    /**
     * Note ref
     */
    note: Ref<Note | null>;

    /**
     * Get note
     *
     * @param id
     */
    getNote: (id: number) => Promise<void>;
}

/**
 * useNote hook
 *
 * @param noteService - Note service instance
 * @returns { NoteHook } - Note hook
 */
function useNote(noteService: NoteService): UseNoteComposableState {
  /**
   * Note ref
   */
  const note = ref<Note | null>(null);

  /**
   * Get note
   *
   * @param id - Note id
   */
  const getNote = async (id: number): Promise<void> => {
    note.value = await noteService.getNoteById(id);
  };

  return {
    note,
    getNote,
  };
};

export default useNote;