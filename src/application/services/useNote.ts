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
  save: (content: NoteContent, parentId: NoteId | undefined, currentNoteId: NoteId | null) => Promise<void>;

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
   * Returns an array of note parents for the current note.
   */
  noteParents: Ref<Note[]>;

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

  /**
   * Returns the id of the note created by the most recent save() on a new note
   * Used to distinguish "same note just got an id after save" from
   * "switched to a different existing note"
   */
  getLastCreatedNoteId: () => NoteId | null;
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
   * Empty array for drafts since they have no note tools
   */
  const noteTools = ref<EditorTool[] | undefined>(currentId.value === null ? [] : undefined);

  /**
   * Router instance used to replace the current route with note id
   */
  const router = useRouter();

  const route = useRoute();

  /**
   * Incremented on each new load request to discard stale async results
   * Prevents race conditions when rapidly switching between notes causes
   * multiple concurrent load() invocations to resolve out of order
   */
  let currentLoadId = 0;

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
   * Note parents of the actual note
   *
   * Actual note by default
   */
  const noteParents = ref<Note[]>([]);
  /**
   * Note hierarchy
   *
   * null by default
   */
  const noteHierarchy = ref<NoteHierarchy | null>(null);

  /**
   * Id of the note created by the most recent save() on a new note
   * Used to skip the reload after save so the editor doesn't get recreated
   */
  let lastCreatedNoteId: NoteId | null = null;

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
    const loadId = ++currentLoadId;

    try {
      const response = await noteService.getNoteById(id);

      /**
       * If a newer load request has superseded this one — discard stale results
       * to prevent mismatched content/tools state when switching notes quickly
       */
      if (loadId !== currentLoadId) {
        return;
      }

      note.value = response.note;
      lastUpdateContent.value = response.note.content;
      canEdit.value = response.accessRights.canEdit;
      noteTools.value = response.tools;
      parentNote.value = response.parentNote;
      noteParents.value = response.parents;
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
   * @param currentNoteId - Id of the current note
   */
  async function save(content: NoteContent, parentId: NoteId | undefined, currentNoteId: NoteId | null): Promise<void> {
    if (note.value === null) {
      throw new Error('Note is not loaded yet');
    }

    /**
     * Resolve tools that are used in note
     */
    const specifiedNoteTools = resolveToolsByContent(content);

    if (currentNoteId === null) {
      /**
       * @todo try-catch domain errors
       */
      const noteCreated = await noteService.createNote(content, specifiedNoteTools, parentId);

      /**
       * Remember the created note id so the editor can avoid
       * recreating itself when the route switches from "new note" to the newly created note id
       */
      lastCreatedNoteId = noteCreated.id;

      /**
       * Store the saved content so the navbar title reflects it
       */
      if (currentId.value === currentNoteId) {
        lastUpdateContent.value = content;
      }

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
      await noteService.updateNoteContentAndTools(currentNoteId, content, specifiedNoteTools);
    }

    /**
     * Store just saved content in memory only if the current note hasn't changed
     * This prevents race conditions when switching between notes quickly
     */
    if (currentId.value === currentNoteId) {
      lastUpdateContent.value = content;
    }
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
    noteTools.value = [];
    canEdit.value = true;
    lastUpdateContent.value = null;
    noteHierarchy.value = null;
  }

  /**
   * Recursively update the note hierarchy title
   * @param hierarchy - The note hierarchy to update
   * @param title - The new title to update in the hierarchy
   */
  function updateNoteHierarchyContent(hierarchy: NoteHierarchy | null, title: string): void {
    // If hierarchy is null, there's nothing to update
    if (!hierarchy) {
      return;
    }

    // If content is null, we can't update the hierarchy content
    if (!title) {
      return;
    }

    // Update the title of the current note in the hierarchy if it matches the currentId
    if (hierarchy.noteId === currentId.value) {
      hierarchy.noteTitle = title;
    }

    // Recursively update child notes
    if (hierarchy.childNotes) {
      hierarchy.childNotes.forEach(child => updateNoteHierarchyContent(child, title));
    }
  }

  watch(currentId, (newId, _prevId) => {
    /**
     * One note is open, user clicks on "+" to create another new note
     * Clear existing note
     */
    if (newId === null) {
      resetNote();

      return;
    }

    /**
     * If the note was just created via save() and is still a draft (no id yet),
     * skip the reload to avoid recreating the editor with the same content.
     */
    if (newId === lastCreatedNoteId && note.value !== null && !('id' in note.value)) {
      return;
    }

    void load(newId);
  });

  watch(noteTitle, (currentNoteTitle) => {
    if (route.name == 'note') {
      patchOpenedPageByUrl(
        route.path,
        {
          title: currentNoteTitle,
          url: route.path,
        });
    }
    updateNoteHierarchyContent(noteHierarchy.value, currentNoteTitle);
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
    noteParents,
    parentNote,
    noteHierarchy,
    getLastCreatedNoteId: () => lastCreatedNoteId,
  };
}
