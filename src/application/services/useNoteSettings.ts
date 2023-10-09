import { ref, type Ref } from 'vue';
import type NotesSettings from '@/domain/entities/NotesSettings';
import type { NoteId } from '@/domain/entities/Note';
import { noteSettingsService } from '@/domain';

/**
 * Note settings hook state
 */
interface UseNoteSettingsComposableState {
  /**
   * NoteSettings ref
   */
  noteSettings: Ref<NotesSettings | null>;

  /**
   * Load note settings
   *
   * @param id - note id
   */
  load: (id: NoteId) => Promise<void>;
}


/**
 * Application service for working with the Note settings
 */
export default function (): UseNoteSettingsComposableState {
  /**
   * NoteSettings ref
   */
  const noteSettings = ref<NotesSettings | null>(null);

  /**
   * Get note settings
   *
   * @param id - Note id
   */
  const load = async (id: NoteId): Promise<void> => {
    noteSettings.value = await noteSettingsService.getNotesSettingsById(id);
  };


  return {
    noteSettings,
    load,
  };
}

