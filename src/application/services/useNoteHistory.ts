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

  /**
   * Content of the certain history record
   */
  historyContent: Ref<NoteHistoryRecord['content'] | undefined>;

  /**
   * Tools that are used in current history content
   */
  historyTools: Ref<NoteHistoryRecord['tools'] | undefined>;

  /**
   * Metadata of the history record
   */
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
  /**
   * Array of the note history metadata
   * Used fot presentation of the note history
   */
  const noteHistory = ref<NoteHistoryMeta[] | null>(null);

  /**
   * Content of the current note history record
   * Used for the presentation of certain history record
   */
  const historyContent = ref<NoteHistoryRecord['content'] | undefined>(undefined);

  /**
   * Note tools used in current note history content
   * Used for the content displaying in editor
   */
  const historyTools = ref<NoteHistoryRecord['tools'] | undefined>(undefined);

  /**
   * Meta data of the note history record
   * Used fot informative presnetation of the note history record
   */
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

  /**
   * Watch fot the history id to load new history record when it is needed
   */
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
