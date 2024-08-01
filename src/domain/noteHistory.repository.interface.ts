import type { NoteHistoryMeta, NoteHistoryRecord, NoteHistoryView } from './entities/History';
import type { Note } from './entities/Note';

/**
 * Interface of the note history repository
 */
export default interface NoteHistoryRepositoryInterface {
  /**
   * Loads note history meta for note history preview
   * @param noteId - id of the note
   */
  loadNoteHistory(noteId: Note['id']): Promise<NoteHistoryMeta[]>;

  /**
   * Get full note history record with user info
   * @param noteId - id of the note with history
   * @param historyId - id of the history record
   * @returns - full note history record with user info
   */
  getNoteHistoryRecordById(noteId: Note['id'], historyId: NoteHistoryRecord['id']): Promise<NoteHistoryView>;
}
