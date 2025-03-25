import { onMounted, ref, type Ref, type MaybeRefOrGetter, computed, toValue, watch } from 'vue';
import { noteService, editorToolsService } from '@/domain';
import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import type { NoteTool } from '@/domain/entities/Note';
import { useRouter, useRoute } from 'vue-router';
import type { NoteDraft } from '@/domain/entities/NoteDraft';
import type EditorTool from '@/domain/entities/EditorTool';
import DomainError from '@/domain/entities/errors/Base';
import useNavbar from './useNavbar';
import { getTitle } from '@/infrastructure/utils/note';
import type { NoteHierarchy } from '@/domain/entities/NoteHierarchy';

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
   * List of tools used in the note
   */
  noteTools: Ref<EditorTool[] | undefined>;

  /**
   * Creates/updates the note
   */
  save: (content: NoteContent, parentId: NoteId | undefined) => Promise<void>;

  /**
   * Returns list of tools used in note
   */
  resolveToolsByContent: (content: NoteContent) => NoteTool[];

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

  /**
   * Note hierarchy
   */
  noteHierarchy: Ref<NoteHierarchy | null>;
}

interface UseNoteComposableOptions {
  /**
   * Note identifier
   */
  id: MaybeRefOrGetter<NoteId | null>;
}

/**
 * Application service for working with the specific Note
 * @param options - note service options
 */
export default function (options: UseNoteComposableOptions): UseNoteComposableState {
  const { patchOpenedPageByUrl, deleteOpenedPageByUrl } = useNavbar();
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
   * Here we will store the content of the note on last save
   */
  const lastUpdateContent = ref<NoteContent | null>(null);

  /**
   * List of tools used in the note
   * Undefined when note is not loaded yet
   */
  const noteTools = ref<EditorTool[] | undefined>(undefined);

  /**
   * Router instance used to replace the current route with note id
   */
  const router = useRouter();

  const route = useRoute();

  /**
   * Is there any note currently saving
   * Used to prevent re-load note after draft is saved
   */
  const isNoteSaving = ref<boolean>(false);

  /**
   * Note Title identifier
   */
  const noteTitle = computed(() => {
    const noteContent = lastUpdateContent.value ?? note.value?.content;

    return getTitle(noteContent);
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
   * Note hierarchy
   *
   * null by default
   */
  const noteHierarchy = ref<NoteHierarchy | null>(null);

  /**
   * get note hierarchy
   * @param id - note id
   */
  async function getNoteHierarchy(id: NoteId): Promise<void> {
    let response = await noteService.getNoteHierarchy(id);

    noteHierarchy.value = response;
  }

  /**
   * Load note by id
   * @param id - Note identifier got from composable argument
   */
  async function load(id: NoteId): Promise<void> {
    try {
      const response = await noteService.getNoteById(id);

      note.value = response.note;
      canEdit.value = response.accessRights.canEdit;
      noteTools.value = response.tools;
      parentNote.value = response.parentNote;
      void getNoteHierarchy(id);
    } catch (error) {
      deleteOpenedPageByUrl(route.path);
      if (error instanceof DomainError) {
        void router.push(`/error/${error.statusCode}`);
      } else {
        void router.push('/error/500');
      }
    }
  }

  /**
   * Returns list of tools used in the note
   * @param content - content of the note
   */
  function resolveToolsByContent(content: NoteContent): NoteTool[] {
    const uniqueNoteTools = new Map<string, NoteTool>();

    content.blocks.forEach((block) => {
      const toolClassAndInfo = editorToolsService.getToolByName(block.type);

      if (toolClassAndInfo === undefined) {
        return;
      }

      uniqueNoteTools.set(toolClassAndInfo.tool.id, {
        id: toolClassAndInfo.tool.id,
        name: toolClassAndInfo.tool.name,
      });
    });

    return Array.from(uniqueNoteTools.values());
  }

  /**
   * Saves the note
   * @param content - Note content (Editor.js data)
   * @param parentId - Id of the parent note. If null, then it's a root note
   */
  async function save(content: NoteContent, parentId: NoteId | undefined): Promise<void> {
    if (note.value === null) {
      throw new Error('Note is not loaded yet');
    }

    /**
     * Resolve tools that are used in note
     */
    const specifiedNoteTools = resolveToolsByContent(content);

    isNoteSaving.value = true;

    if (currentId.value === null) {
      /**
       * @todo try-catch domain errors
       */
      const noteCreated = await noteService.createNote(content, specifiedNoteTools, parentId);

      /**
       * Replace the current route with note id
       */
      await router.replace({
        name: 'note',
        params: {
          id: noteCreated.id,
        },
      });

      patchOpenedPageByUrl(
        route.path,
        {
          title: noteTitle.value,
          url: route.path,
        });

      /**
       * Get note Hierarchy when new Note is created
       */
      void getNoteHierarchy(noteCreated.id);
    } else {
      await noteService.updateNoteContentAndTools(currentId.value, content, specifiedNoteTools);
    }

    /**
     * Store just saved content in memory
     */
    lastUpdateContent.value = content;

    isNoteSaving.value = false;
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

    await noteService.unlinkParent(currentId.value);

    parentNote.value = undefined;
  }

  /**
   * Get note by custom hostname
   */
  const resolveHostname = async (): Promise<void> => {
    note.value = (await noteService.getNoteByHostname(location.hostname)).note;
  };

  onMounted(() => {
    /**
     * If we have id, load note and note hierarchy
     */
    if (currentId.value !== null) {
      void load(currentId.value);
    }
  });

  /**
   * Reset note to the initial state
   */
  function resetNote(): void {
    note.value = createDraft();
    canEdit.value = true;
    lastUpdateContent.value = null;
    noteHierarchy.value = null;
  }

  /**
   * Recursively update the note hierarchy content
   * @param hierarchy - The note hierarchy to update
   * @param content - The new content to update in the hierarchy
   */
  function updateNoteHierarchyContent(hierarchy: NoteHierarchy | null, content: NoteContent | null): void {
    // If hierarchy is null, there's nothing to update
    if (!hierarchy) {
      return;
    }

    // If content is null, we can't update the hierarchy content
    if (!content) {
      return;
    }

    // Update the content of the current note in the hierarchy if it matches the currentId
    if (hierarchy.id === currentId.value) {
      hierarchy.content = content;
    }

    // Recursively update child notes
    if (hierarchy.childNotes) {
      hierarchy.childNotes.forEach(child => updateNoteHierarchyContent(child, content));
    }
  }

  watch(currentId, (newId, prevId) => {
    /**
     * One note is open, user clicks on "+" to create another new note
     * Clear existing note
     */
    if (newId === null) {
      resetNote();

      return;
    }

    const isDraftSaving = prevId === null && isNoteSaving.value;

    /**
     * Case for newly created note,
     * we don't need to re-load it
     */
    if (isDraftSaving) {
      return;
    }

    void load(newId);
  });

  watch(noteTitle, (currentNoteTitle) => {
    patchOpenedPageByUrl(
      route.path,
      {
        title: currentNoteTitle,
        url: route.path,
      });

    updateNoteHierarchyContent(noteHierarchy.value, lastUpdateContent.value);
  });

  return {
    note,
    noteTools,
    noteTitle,
    canEdit,
    resolveHostname,
    resolveToolsByContent,
    save,
    unlinkParent,
    parentNote,
    noteHierarchy,
  };
}
