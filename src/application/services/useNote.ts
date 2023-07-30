import { ref, type Ref } from 'vue';
import type Note from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';
import { noteService } from '@/domain';

/**
 * Note hook state
 */
interface UseNoteComposableState {
  /**
   * Note ref
   */
  note: Ref<Note | null>;

  /**
   * NoteSettings ref
   */
  noteSettings: Ref<NotesSettings | null>;

  /**
   * Load note
   *
   * @param publicId - note publicId
   */
  load: (publicId: string) => Promise<void>;

  /**
   * Load note settings
   *
   * @param publicId - note publicId
   */
  loadSettings: (publicId: string) => Promise<void>;

  /**
   * Update note settings
   *
   * @param noteSettings - note settings
   */
  updateSettings: (noteSettings: NotesSettings) => Promise<void>

  /**
   * Load note by custom hostname
   */
  resolveHostname: () => Promise<void>;

  /**
   * Is loading
   */
  isLoading: Ref<boolean>;
}

/**
 * useNote hook
 *
 * @returns { UseNoteComposableState } - Note hook state
 */
export default function (): UseNoteComposableState {
  /**
   * Note ref
   */
  const note = ref<Note | null>(null);

  /**
   * NoteSettings ref
   */
  const noteSettings = ref<NotesSettings | null>(null);

  /**
   * Is loading
   */
  const isLoading = ref<boolean>(false);

  /**
   * Get note
   *
   * @param publicId - Note publicId
   */
  const load = async (publicId: string): Promise<void> => {
    isLoading.value = true;
    note.value = await noteService.getNoteById(publicId);
    isLoading.value = false;
  };

  /**
   * Get note settings
   *
   * @param publicId - Note publicId
   */
  const loadSettings = async (publicId: string): Promise<void> => {
    isLoading.value = true;
    noteSettings.value = await noteService.getNotesSettingsById(publicId);
    isLoading.value = false;
  };

  /**
   * Update settings
   *
   * @param publicId - Note publicId
   */
  const updateSettings = async (noteSettings: NotesSettings): Promise<void> => {
    isLoading.value = true;
    await noteService.updateNoteSettings(noteSettings);
    isLoading.value = false;
  };

  /**
   * Get note by custom hostname
   */
  const resolveHostname = async (): Promise<void> => {
    isLoading.value = true;
    note.value = await noteService.getNoteByHostname(location.hostname);
    isLoading.value = false;
  };

  return {
    note,
    noteSettings,
    load,
    resolveHostname,
    loadSettings,
    updateSettings,
    isLoading,
  };
}

