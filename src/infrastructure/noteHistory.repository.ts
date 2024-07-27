import type NoteHistoryRepositoryInterface from '@/domain/noteHistory.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type { Note } from '@/domain/entities/Note';
import type { NoteHistoryMeta } from '@/domain/entities/History';

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
}
