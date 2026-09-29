import { onBeforeUnmount, onMounted, ref, type Ref, type MaybeRefOrGetter, computed, toValue, watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import { noteService, editorToolsService } from '@/domain';
import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import type { NoteTool } from '@/domain/entities/Note';
import { useRouter, useRoute } from 'vue-router';
import type { NoteDraft } from '@/domain/entities/NoteDraft';
import type EditorTool from '@/domain/entities/EditorTool';
import DomainError from '@/domain/entities/errors/Base';
import UnauthorizedError from '@/domain/entities/errors/Unauthorized';
import ForbiddenError from '@/domain/entities/errors/Forbidden';
import useNavbar from './useNavbar';
import { useAppState } from './useAppState';
import { getTitle } from '@/infrastructure/utils/note';
import type { NoteHierarchy } from '@/domain/entities/NoteHierarchy';

/**
 * Pause in typing after which changes are saved
 */
const SAVE_DELAY = 1000;

/**
 * Changes are saved at least this often during continuous typing
 */
const SAVE_MAX_WAIT = 5000;

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
 * State of the note saving
 * pending - there are unsaved changes waiting for the save delay
 */
export type NoteSaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

/**
 * Note that is being created. Gets an id after the first save
 */
interface DraftTarget {
  id: NoteId | null;
}

/**
 * Changes to save, bound to the note they were made in
 */
interface SaveJob {
  target: NoteId | DraftTarget;
  content: NoteContent;
  parentId?: NoteId;
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
   * Saves the changes after a short pause, so typing does not send a request per keystroke
   */
  scheduleSave: (content: NoteContent, parentId?: NoteId) => void;

  /**
   * Saves scheduled changes immediately
   */
  flushSave: () => Promise<void>;

  /**
   * State of the note saving
   */
  saveStatus: Ref<NoteSaveStatus>;

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
}

interface UseNoteComposableOptions {
  /**
   * Note identifier
   */
  id: MaybeRefOrGetter<NoteId | null>;

  /**
   * Load the tree of the related notes, needed only for the note page sidebar
   */
  withHierarchy?: boolean;
}

/**
 * Application service for working with the specific Note
 * @param options - note service options
 */
export default function (options: UseNoteComposableOptions): UseNoteComposableState {
  const { patchOpenedPageByUrl, deleteOpenedPageByUrl } = useNavbar();
  const { user } = useAppState();
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
   * Here we will store the latest content of the note, even if it is not saved yet
   */
  const lastUpdateContent = ref<NoteContent | null>(null);

  /**
   * List of tools used in the note
   * Undefined when note is not loaded yet
   * Empty array for drafts since they have no note tools
   */
  const noteTools = ref<EditorTool[] | undefined>(currentId.value === null ? [] : undefined);

  const router = useRouter();

  const route = useRoute();

  /**
   * Note Title identifier
   */
  const noteTitle = computed(() => {
    const noteContent = lastUpdateContent.value ?? note.value?.content;

    return getTitle(noteContent);
  });

  /**
   * Editing rights for the currently opened note
   * Drafts are editable, loaded notes get the rights from the API
   */
  const canEdit = ref<boolean>(currentId.value === null);

  /**
   * Parent note
   *
   * undefined by default
   */
  const parentNote = ref<Note | undefined>(undefined);

  /**
   * Note parents of the actual note
   */
  const noteParents = ref<Note[]>([]);

  /**
   * Note hierarchy
   *
   * null by default
   */
  const noteHierarchy = ref<NoteHierarchy | null>(null);

  const saveStatus = ref<NoteSaveStatus>('idle');

  let draft: DraftTarget = { id: null };

  /**
   * Id the draft route is being replaced with, its content is already in the editor
   */
  let createdDraftId: NoteId | null = null;

  let pendingJob: SaveJob | null = null;

  let pendingSince: number | null = null;

  /**
   * Last saved blocks, so the same content is not sent twice
   */
  let lastSaved: { target: SaveJob['target']; blocks: string } | null = null;

  let saveTimer: ReturnType<typeof setTimeout> | undefined;

  /**
   * Saves run one by one, so a new note is created once and later changes update it
   */
  let saveQueue: Promise<void> = Promise.resolve();

  /**
   * Incremented on each load, so a slow response for a previously opened note is ignored
   */
  let loadCounter = 0;

  /**
   * get note hierarchy
   * @param id - note id
   */
  async function getNoteHierarchy(id: NoteId): Promise<void> {
    try {
      noteHierarchy.value = await noteService.getNoteHierarchy(id);
    } catch (error) {
      /**
       * The sidebar is optional, the note stays usable without it
       */
      console.warn('Failed to load the note hierarchy', error);
    }
  }

  /**
   * Load note by id
   * @param id - Note identifier got from composable argument
   */
  async function load(id: NoteId): Promise<void> {
    const loadId = ++loadCounter;

    note.value = null;
    lastUpdateContent.value = null;
    noteTools.value = undefined;

    try {
      const response = await noteService.getNoteById(id);

      if (loadId !== loadCounter) {
        return;
      }

      note.value = response.note;
      canEdit.value = response.accessRights.canEdit;
      noteTools.value = response.tools;
      parentNote.value = response.parentNote;
      noteParents.value = response.parents;

      if (options.withHierarchy === true) {
        void getNoteHierarchy(id);
      }
    } catch (error) {
      if (loadId !== loadCounter) {
        return;
      }

      /**
       * Private note opened by an anonymous user: log in and come back
       */
      if ((error instanceof UnauthorizedError || error instanceof ForbiddenError) && !user.value) {
        void router.replace({
          name: 'authorization',
          query: { redirect: route.fullPath },
        });

        return;
      }

      deleteOpenedPageByUrl(route.path);
      void router.replace(`/error/${error instanceof DomainError && error.statusCode !== undefined ? error.statusCode : '500'}`);
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
   * Sends the changes to the API
   * @param job - changes and the note they belong to
   */
  async function persist(job: SaveJob): Promise<void> {
    const tools = resolveToolsByContent(job.content);

    saveStatus.value = 'saving';

    try {
      if (typeof job.target === 'string') {
        await noteService.updateNoteContentAndTools(job.target, job.content, tools);
      } else if (job.target.id !== null) {
        await noteService.updateNoteContentAndTools(job.target.id, job.content, tools);
      } else {
        const noteCreated = await noteService.createNote(job.content, tools, job.parentId);

        job.target.id = noteCreated.id;

        /**
         * Replace the draft route with the note route if user is still on the draft
         */
        if (job.target === draft && currentId.value === null) {
          const draftUrl = route.path;

          createdDraftId = noteCreated.id;
          await router.replace({
            name: 'note',
            params: {
              id: noteCreated.id,
            },
          });

          deleteOpenedPageByUrl(draftUrl);
          patchOpenedPageByUrl(route.path, {
            title: getTitle(job.content),
            url: route.path,
          });

          if (options.withHierarchy === true) {
            void getNoteHierarchy(noteCreated.id);
          }
        }
      }

      lastSaved = {
        target: job.target,
        blocks: JSON.stringify(job.content.blocks),
      };
      saveStatus.value = pendingJob === null ? 'saved' : 'pending';
    } catch (error) {
      console.error(error);

      /**
       * Keep the changes, so the next edit or retry saves them
       */
      pendingJob ??= job;
      saveStatus.value = 'error';
    }
  }

  /**
   * Saves scheduled changes immediately
   */
  function flushSave(): Promise<void> {
    clearTimeout(saveTimer);
    pendingSince = null;

    const job = pendingJob;

    pendingJob = null;

    if (job !== null) {
      saveQueue = saveQueue.then(() => persist(job));
    }

    return saveQueue;
  }

  /**
   * Saves the changes after a short pause
   * @param content - Note content (Editor.js data)
   * @param parentId - Id of the parent note for a new note
   */
  function scheduleSave(content: NoteContent, parentId?: NoteId): void {
    const target = currentId.value ?? draft;

    if (pendingJob === null && lastSaved?.target === target && lastSaved.blocks === JSON.stringify(content.blocks)) {
      return;
    }

    pendingJob = {
      target,
      content,
      parentId,
    };
    lastUpdateContent.value = content;
    saveStatus.value = 'pending';

    pendingSince ??= Date.now();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => void flushSave(), Math.min(SAVE_DELAY, pendingSince + SAVE_MAX_WAIT - Date.now()));
  }

  /**
   * Unlink note from parent
   */
  async function unlinkParent(): Promise<void> {
    if (currentId.value === null) {
      throw new Error('Note id is not defined');
    }

    await noteService.unlinkParent(currentId.value);

    parentNote.value = undefined;
  }

  onMounted(() => {
    if (currentId.value !== null) {
      void load(currentId.value);
    }
  });

  onBeforeUnmount(() => {
    void flushSave();
  });

  /**
   * Ask the browser to confirm leaving the page while changes are not saved yet
   */
  useEventListener(window, 'beforeunload', (event: BeforeUnloadEvent) => {
    if (pendingJob !== null || saveStatus.value === 'saving') {
      void flushSave();
      event.preventDefault();
    }
  });

  /**
   * Reset note to the initial state
   */
  function resetNote(): void {
    loadCounter++;
    draft = { id: null };
    note.value = createDraft();
    noteTools.value = [];
    canEdit.value = true;
    lastUpdateContent.value = null;
    noteHierarchy.value = null;
    noteParents.value = [];
    parentNote.value = undefined;
    saveStatus.value = 'idle';
  }

  /**
   * Recursively update the note hierarchy title
   * @param hierarchy - The note hierarchy to update
   * @param title - The new title to update in the hierarchy
   */
  function updateNoteHierarchyContent(hierarchy: NoteHierarchy | null, title: string): void {
    if (!hierarchy) {
      return;
    }

    if (hierarchy.noteId === currentId.value) {
      hierarchy.noteTitle = title;
    }

    hierarchy.childNotes?.forEach(child => updateNoteHierarchyContent(child, title));
  }

  watch(currentId, (newId) => {
    /**
     * Changes of the previous note are bound to it, save them before switching
     */
    void flushSave();

    /**
     * One note is open, user clicks on "+" to create another new note
     */
    if (newId === null) {
      resetNote();

      return;
    }

    if (newId === createdDraftId) {
      createdDraftId = null;

      return;
    }

    saveStatus.value = 'idle';
    void load(newId);
  });

  watch(noteTitle, (currentNoteTitle) => {
    if (route.name === 'note' && note.value !== null) {
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
    scheduleSave,
    flushSave,
    saveStatus,
    unlinkParent,
    noteParents,
    parentNote,
    noteHierarchy,
  };
}
