import { onMounted, ref, type Ref, type MaybeRefOrGetter, computed, toValue, watch } from 'vue';
import type NotesSettings from '@/domain/entities/NotesSettings';
import { noteService } from '@/domain';
import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import { useRouter } from 'vue-router';

/**
 * On new note creation, we use predefined structure of the Editor: header + paragraph
 * We call it NoteDraft
 */
type NoteDraft = Pick<Note, 'content'>;

/**
 * Creates base structure for the empty note:
 * First block is Header, second is an empty Paragraph
 */
function createDraft(): NoteDraft {
  return {
    content: {
      blocks: [
        {
          type: 'header',
          data: {
            level: 1,
            text: '',
          },
        },
        {
          type: 'paragraph',
          data: {
            text: '',
          },
        },
      ],
    },
  };
}

/**
 * Note hook state
 */
interface UseNoteComposableState {
  /**
   * NoteDraft - on new note creation
   * Note - when note is loaded
   * null - when note is not loaded yet
   */
  note: Ref<Note | NoteDraft | null>;

  /**
   * Creates/updates the note
   */
  save: (content: NoteContent) => Promise<void>;

  /**
   * NoteSettings ref
   *
   * @todo move to the Note Settings service
   */
  noteSettings: Ref<NotesSettings | null>;

  /**
   * Load note settings
   *
   * @param publicId - note publicId
   *
   * @todo move to the Note Settings service
   */
  loadSettings: (publicId: string) => Promise<void>;

  /**
   * Load note by custom hostname
   */
  resolveHostname: () => Promise<void>;
}

interface UseNoteComposableOptions {
  /**
   * Note identifier
   */
  id: MaybeRefOrGetter<NoteId | null>;
}

/**
 * Application service for working with the specific Note
 *
 * @param options - note service options
 */
export default function (options: UseNoteComposableOptions): UseNoteComposableState {
  /**
   * Current note identifier
   */
  const currentId = computed(() => toValue(options.id));

  /**
   * Currently opened note
   *
   * When new note is created, fill with draft
   */
  const note = ref<Note | NoteDraft | null>(currentId.value === null ? createDraft() : null);

  /**
   * NoteSettings ref
   */
  const noteSettings = ref<NotesSettings | null>(null);

  /**
   * Router instance used to replace the current route with note id
   */
  const router = useRouter();

  /**
   * Load note by id
   *
   * @param id - Note identifier got from composable argument
   */
  async function load(id: NoteId): Promise<void> {
    /**
     * @todo try-catch domain errors
     */
    note.value = await noteService.getNoteById(id);
  };

  /**
   * Saves the note
   *
   * @param content - Note content (Editor.js data)
   */
  async function save(content: NoteContent): Promise<void> {
    if (note.value === null) {
      throw new Error('Note is not loaded yet');
    }

    if (currentId.value === null) {
      /**
       * @todo try-catch domain errors
       */
      const noteCreated = await noteService.createNote(content);

      /**
       * Replace the current route with note id
       */
      router.replace({
        name: 'note',
        params: {
          id: noteCreated.id,
        },
      });

      return;
    }

    /**
     * @todo update note
     */
    // await noteService.updateNoteContent(currentId.value, content);
  }

  /**
   * Get note settings
   *
   * @param publicId - Note publicId
   *
   * @todo move to the Note Settings service
   */
  const loadSettings = async (publicId: string): Promise<void> => {
    noteSettings.value = await noteService.getNotesSettingsById(publicId);
  };

  /**
   * Get note by custom hostname
   */
  const resolveHostname = async (): Promise<void> => {
    note.value = await noteService.getNoteByHostname(location.hostname);
  };

  onMounted(() => {
    /**
     * If we have id, load note
     */
    if (currentId.value !== null) {
      load(currentId.value);
    }
  });

  watch(currentId, (newId, prevId) => {
    /**
     * One note is open, user clicks on "+" to create another new note
     * Clear existing note
     */
    if (newId === null) {
      note.value = createDraft();

      return;
    }

    /**
     * Case for newly created note,
     * we don't need to re-load it
     */
    if (prevId === null && newId !== null) {
      return;
    }

    load(newId);
  });

  return {
    note,
    noteSettings,
    resolveHostname,
    loadSettings,
    save,
  };
}

