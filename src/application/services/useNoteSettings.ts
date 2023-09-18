import { ref, type Ref } from 'vue';
import type NotesSettings from '@/domain/entities/NotesSettings';
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
   * @param publicId - note publicId
   */
  loadSettings: (publicId: string) => Promise<void>;
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
   * @param publicId - Note publicId
   */
  const loadSettings = async (publicId: string): Promise<void> => {
    noteSettings.value = await noteSettingsService.getNotesSettingsById(publicId);
  };


  return {
    noteSettings,
    loadSettings,
  };
}

