import type { NoteHistoryMeta } from './entities/History';
import type { Note } from './entities/Note';
import type NoteHistoryRepository from './noteHistory.repository.interface';

export default class NoteHistoryService {
  private readonly noteHistoryRepository: NoteHistoryRepository;

  constructor(historyRepository: NoteHistoryRepository) {
    this.noteHistoryRepository = historyRepository;
  }

  public async loadNoteHistory(noteId: Note['id']): Promise<NoteHistoryMeta[]> {
    return await this.noteHistoryRepository.loadNoteHistory(noteId);
  }
}
