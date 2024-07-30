import type { NoteHistoryMeta, NoteHistoryRecord } from './entities/History';
import type { Note } from './entities/Note';
import type NoteHistoryRepository from './noteHistory.repository.interface';

/**
 * Note history service class, used for logic handling of the data,
 * Also used for data delivery from repository to application service
 */
export default class NoteHistoryService {
  /**
   * Note history repository instance
   */
  private readonly noteHistoryRepository: NoteHistoryRepository;

  constructor(historyRepository: NoteHistoryRepository) {
    this.noteHistoryRepository = historyRepository;
  }

  /**
   * Loads note history meta for note history preview
   * @param noteId - id of the note
   */
  public async loadNoteHistory(noteId: Note['id']): Promise<NoteHistoryMeta[]> {
    return await this.noteHistoryRepository.loadNoteHistory(noteId);
  }

  public async getNoteHistoryRecordById(noteId: Note['id'], historyId: NoteHistoryRecord['id']): Promise<NoteHistoryRecord> {
    return await this.noteHistoryRepository.getNoteHistoryRecordById(noteId, historyId);
  }
}
