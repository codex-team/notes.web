import type NotesSettings from '@/domain/entities/NotesSettings';
import type { NoteId } from './entities/Note';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteSettingsRepositoryInterface {

  /**
   * Returns NotesSettings by  id
   *
   * @param  id - note  id
   * @throws Will throw an error if id is not found.
   * @returns NotesSettings - NotesSettings instance
   */
  getNotesSettingsById(id: NoteId): Promise<NotesSettings>;
}
