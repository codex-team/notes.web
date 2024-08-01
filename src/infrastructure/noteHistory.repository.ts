import type NoteHistoryRepositoryInterface from '@/domain/noteHistory.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type { Note } from '@/domain/entities/Note';
import type { NoteHistoryMeta, NoteHistoryRecord, NoteHistoryView } from '@/domain/entities/History';

/**
 * Note history repository class used for data delivery from transport to service
 */
export default class NoteHistoryRepository implements NoteHistoryRepositoryInterface {
  /**
   * Notes api transport instance
   */
  private readonly transport: NotesApiTransport;

  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Loads note history meta for note history preview
   * @param noteId - id of the note
   */
  public async loadNoteHistory(noteId: Note['id']): Promise<NoteHistoryMeta[]> {
    const response = await this.transport.get<{ noteHistoryMeta: NoteHistoryMeta[] }>(`/note/${noteId}/history`);

    return response.noteHistoryMeta;
  }

  /**
   * Get full note history record with user info
   * @param noteId - id of the note with history
   * @param historyId - id of the history record
   * @returns - full note history record with user info
   */
  public async getNoteHistoryRecordById(noteId: Note['id'], historyId: NoteHistoryRecord['id']): Promise<NoteHistoryView> {
    const response = await this.transport.get<{ noteHistoryRecord: NoteHistoryView }>(`/note/${noteId}/history/${historyId}`);

    return response.noteHistoryRecord;
  }
}
