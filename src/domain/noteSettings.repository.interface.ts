import type NoteSettings from '@/domain/entities/NoteSettings';
import type { NoteId } from './entities/Note';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface NoteSettingsRepositoryInterface {

  /**
   * Returns setting for a note with passed id
   *
   * @param  id - note  id
   * @throws Will throw an error if id is not found.
   * @returns NoteSettings - NoteSettings instance
   */
  getNoteSettingsById(id: NoteId): Promise<NoteSettings>;
}
