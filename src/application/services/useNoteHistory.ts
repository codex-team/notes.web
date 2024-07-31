import type { MaybeRefOrGetter, Ref } from 'vue';
import { computed, onMounted, ref, toValue, watch } from 'vue';
import type { NoteHistoryRecord, NoteHistoryMeta } from '@/domain/entities/History';
import type { Note } from '@/domain/entities/Note';
import { noteHistoryService } from '@/domain';
import { notEmpty } from '@/infrastructure/utils/empty';

interface UseNoteHistoryComposableState {
  /**
   * Note hisotry is array of the history meta used for history preview
   */
  noteHistory: Ref<NoteHistoryMeta[] | null>;

  historyContent: Ref<NoteHistoryRecord['content'] | undefined>;
  historyTools: Ref<NoteHistoryRecord['tools'] | undefined>;
  historyMeta: Ref<NoteHistoryMeta | undefined>;
}

interface UseNoteHistoryComposableOptions {
  /**
   * Id of the note
   */
  noteId: MaybeRefOrGetter<NoteHistoryRecord['noteId'] | null>;

  /**
   * Id of the history record
   */
  historyId?: Ref<NoteHistoryRecord['id'] | null>;
}

export default function useNoteHistory(options: UseNoteHistoryComposableOptions): UseNoteHistoryComposableState {
  const noteHistory = ref<NoteHistoryMeta[] | null>(null);

  const historyContent = ref<NoteHistoryRecord['content'] | undefined>(undefined);
  const historyTools = ref<NoteHistoryRecord['tools'] | undefined>(undefined);
  const historyMeta = ref<NoteHistoryMeta | undefined>(undefined);

  const currentNoteId = computed(() => toValue(options.noteId));
  const currentHistoryId = computed(() => toValue(options.historyId));

  /**
   * Loads full note history meta for certain note
   * @param noteId - id of the note with history
   */
  async function loadNoteHistory(noteId: Note['id']): Promise<void> {
    noteHistory.value = await noteHistoryService.loadNoteHistory(noteId);
  }

  /**
   * Get full note history record with user info
   * @param noteId - id of the note with history
   * @param historyId - id of the history record
   * @returns - full note history record with user info
   */
  async function loadNoteHistoryRecord(noteId: Note['id'], historyId: NoteHistoryRecord['id']): Promise<void> {
    const historyRecord = await noteHistoryService.getNoteHistoryRecordById(noteId, historyId);

    historyContent.value = historyRecord.content;
    historyTools.value = historyRecord.tools;
    historyMeta.value = {
      id: historyRecord.id,
      userId: historyRecord.userId,
      createdAt: historyRecord.createdAt,
      user: historyRecord.user,
    };
  }

  /**
   * When page is mounted, we should load note history
   */
  onMounted(async () => {
    if (currentNoteId.value !== null) {
      await loadNoteHistory(currentNoteId.value);
    }
  });

  watch(currentHistoryId, async (historyId) => {
    if (notEmpty(historyId) && currentNoteId.value !== null) {
      await loadNoteHistoryRecord(currentNoteId.value, historyId);
    }
  }, {
    immediate: true,
  });

  return {
    noteHistory,
    historyContent,
    historyTools,
    historyMeta,
  };
}
