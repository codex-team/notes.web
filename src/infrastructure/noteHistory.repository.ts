import type NoteHistoryRepositoryInterface from '@/domain/noteHistory.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type { Note } from '@/domain/entities/Note';
import type { NoteHistoryMeta } from '@/domain/entities/History';

export default class NoteHistoryRepository implements NoteHistoryRepositoryInterface {
  private readonly transport: NotesApiTransport;

  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  public async loadNoteHistory(noteId: Note['id']): Promise<NoteHistoryMeta[]> {
    console.log('noteIID', noteId);
    const response = await this.transport.get<{ noteHistoryMeta: NoteHistoryMeta[] }>(`/note/${noteId}/history`);

    console.log('resssssss', response);

    return response.noteHistoryMeta;
  }
}
