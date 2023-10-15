import type NoteSettingsRepositoryInterface from '@/domain/noteSettings.repository.interface';
import type NoteSettings from '@/domain/entities/NoteSettings';
import type NoteStorage from '@/infrastructure/storage/note';
import type NotesApiTransport from '@/infrastructure/transport/notes-api';
import type { NoteId } from '@/domain/entities/Note';
import type { GetNoteSettingsResponsePayload } from '@/infrastructure/transport/notes-api/types/GetNoteSettingsResponsePayload';

/**
 * Note settings repository
 */
export default class NoteSettingsRepository implements NoteSettingsRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Note storage
   */
  private noteStorage: NoteStorage;

  /**
   * Note repository constructor
   *
   * @param noteStorage - note storage instance
   * @param notesApiTransport - notes api transport instance
   */
  constructor(noteStorage: NoteStorage, notesApiTransport: NotesApiTransport) {
    this.noteStorage = noteStorage;
    this.transport = notesApiTransport;
  }

  /**
   * Returns setting for a note by note ID
   *
   * @param id - Note id
   * @returns { NoteSettings } - NoteSettings instance
   */
  public async getNoteSettingsById(id: NoteId): Promise<NoteSettings> {
    return await this.transport.get<GetNoteSettingsResponsePayload>('/note/' + id + '/settings');
  }
}
