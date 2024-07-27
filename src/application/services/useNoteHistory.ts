import type { MaybeRefOrGetter, Ref } from 'vue';
import { computed, onMounted, ref, toValue } from 'vue';
import type { NoteHistoryRecord, NoteHistoryMeta } from '@/domain/entities/History';
import type { Note } from '@/domain/entities/Note';
import { noteHistoryService } from '@/domain';

interface UseNoteHistoryComposableState {
  /**
   * Note hisotry is array of the history meta used for history preview
   */
  noteHistory: Ref<NoteHistoryMeta[] | null>;
}

interface UseNoteHistoryComposableOptions {
  /**
   * Id of the note
   */
  noteId: MaybeRefOrGetter<NoteHistoryRecord['noteId'] | null>;
}

export default function useNoteHistory(options: UseNoteHistoryComposableOptions): UseNoteHistoryComposableState {
  const noteHistory = ref<NoteHistoryMeta[] | null>(null);

  const currentNoteId = computed(() => toValue(options.noteId));

  async function loadNoteHistory(noteId: Note['id']): Promise<void> {
    noteHistory.value = await noteHistoryService.loadNoteHistory(noteId);
  }

  /**
   * When page is mounted, we should load note history
   */
  onMounted(() => {
    if (currentNoteId.value !== null) {
      void loadNoteHistory(currentNoteId.value);
    }
  });

  return {
    noteHistory: noteHistory,
  };
}
