import { onMounted, ref, type Ref, type MaybeRefOrGetter, computed, toValue, watch } from 'vue';
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
  save: (content: NoteContent, parentId: NoteId | undefined) => Promise<void>;

  /**
   * Load note by custom hostname
   */
  resolveHostname: () => Promise<void>;

  /**
   * Unlink note from parent
   */
  unlinkParent: () => Promise<void>;

  /**
   * Defines if user can edit note
   */
  canEdit: Ref<boolean>;

  /**
   * Parent note, undefined if it's a root note
   */
  parentNote: Ref<Note | undefined>;

  /**
   * Title for bookmarks in the browser
   */
  noteTitle: Ref<string>;
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
   * Router instance used to replace the current route with note id
   */
  const router = useRouter();

  const limitCharsForNoteTitle = 50;

  /**
   * Note Title identifier
   */
  const noteTitle = computed(() => {
    const firstNoteBlock = note.value?.content.blocks[0];

    if (!firstNoteBlock || !Boolean(firstNoteBlock.data.text)) {
      return 'Note';
    } else {
      return firstNoteBlock.data.text.slice(0, limitCharsForNoteTitle);
    }
  });

  /**
   * Editing rights for the currently opened note
   *
   * true by default
   */
  const canEdit = ref<boolean>(true);

  /**
   * Parent note
   *
   * undefined by default
   */
  const parentNote = ref<Note | undefined>(undefined);

  /**
   * Load note by id
   *
   * @param id - Note identifier got from composable argument
   */
  async function load(id: NoteId): Promise<void> {
    /**
     * @todo try-catch domain errors
     */
    const response = await noteService.getNoteById(id);

    note.value = response.note;
    canEdit.value = response.accessRights.canEdit;
    parentNote.value = response.parentNote;
  }

  /**
   * Saves the note
   *
   * @param content - Note content (Editor.js data)
   * @param parentId - Id of the parent note. If null, then it's a root note
   */
  async function save(content: NoteContent, parentId: NoteId | undefined): Promise<void> {
    if (note.value === null) {
      throw new Error('Note is not loaded yet');
    }

    if (currentId.value === null) {
      /**
       * @todo try-catch domain errors
       */
      const noteCreated = await noteService.createNote(content, parentId);

      /**
       * Replace the current route with note id
       */
      void router.replace({
        name: 'note',
        params: {
          id: noteCreated.id,
        },
      });

      return;
    }

    await noteService.updateNoteContent(currentId.value, content);
    note.value = { ...note.value, content };
  }

  /**
   * Unlink note from parent
   */
  async function unlinkParent(): Promise<void> {
    if (note.value === null) {
      throw new Error('Note is not loaded yet');
    }

    if (currentId.value === null) {
      throw new Error('Note id is not defined');
    }

    parentNote.value = undefined;

    await noteService.unlinkParent(currentId.value);
  }

  /**
   * Get note by custom hostname
   */
  const resolveHostname = async (): Promise<void> => {
    note.value = (await noteService.getNoteByHostname(location.hostname)).note;
  };

  onMounted(() => {
    /**
     * If we have id, load note
     */
    if (currentId.value !== null) {
      void load(currentId.value);
    }
  });

  watch(currentId, (newId, prevId) => {
    /**
     * One note is open, user clicks on "+" to create another new note
     * Clear existing note
     */
    if (newId === null) {
      note.value = createDraft();
      canEdit.value = true;

      return;
    }

    /**
     * Case for newly created note,
     * we don't need to re-load it
     */
    if (prevId === null && newId !== null) {
      return;
    }

    void load(newId);
  });

  return {
    note,
    noteTitle,
    canEdit,
    resolveHostname,
    save,
    unlinkParent,
    parentNote,
  };
}
