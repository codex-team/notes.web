import type { NoteHistoryMeta } from './entities/History';
import type { Note } from './entities/Note';

export default interface NoteHistoryRepositoryInterface {
  /**
   * Loads note history meta for note history preview
   * @param noteId - id of the note
   */
  loadNoteHistory(noteId: Note['id']): Promise<NoteHistoryMeta[]>;
}
