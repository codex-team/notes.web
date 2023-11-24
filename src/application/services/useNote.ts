import { onMounted, ref, type Ref, type MaybeRefOrGetter, computed, toValue, watch } from 'vue';
import { noteService } from '@/domain';
import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';
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
 * Create access rights for the empty note
 */
function createAccessRights(): NoteAccessRights {
  return {
    canEdit: true,
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
   * Load note by custom hostname
   */
  resolveHostname: () => Promise<void>;

  /**
   * NoteAccessRights - when note is loaded or new note created
   * null - when note and its access rights is not loaded yet
   */
  accessRights: Ref<NoteAccessRights | null>;
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

  /**
   * Access rights for currently opened note
   *
   * Create new NoteAccessRights instance when new note is created
   */
  const accessRights = ref<NoteAccessRights | null>(currentId.value == null ? createAccessRights() : null);

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
    accessRights.value = response.accessRights;
  }

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
      void router.replace({
        name: 'note',
        params: {
          id: noteCreated.id,
        },
      });

      return;
    }


    await noteService.updateNoteContent(currentId.value, content);
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
      accessRights.value = createAccessRights();

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
    accessRights,
    resolveHostname,
    save,
  };
}

