import NoteRepositoryInterface from '../domain/note.repository.interface';
import Note from '../domain/entities/Note';
import NoteStorage from './storage/note';
import Transport from './transport';

/**
 * Get note response
 */
interface GetNoteResponse {
  /**
   * Note id
   */
  id: number;

  /**
   * Note title
   */
  title: string;

  /**
   * Note content
   */
  content: string;
}

/**
 * Note repository
 */
export default class NoteRepository implements NoteRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: Transport;

  /**
   * Note storage
   */
  private noteStorage: NoteStorage;

  /**
   * Note repository constructor
   *
   * @param noteStorage - note storage instance
   * @param transport - transport instance
   */
  constructor(noteStorage: NoteStorage, transport: Transport) {
    this.noteStorage = noteStorage;
    this.transport = transport;
  }

  /**
   * Get note by id
   *
   * @param id - Note id
   * @returns { Note | null } - Note instance
   */
  public async getNoteById(id: number): Promise<Note | null> {
    const noteData = await this.noteStorage.getNoteById(id);

    /**
     * If note data in storage exists
     */
    if (noteData) {
      return {
        id: noteData.id,
        title: noteData.title,
        content: noteData.content,
      };
    }

    /**
     * Get note data from API
     */
    const noteResponse = await this.transport.get<GetNoteResponse>('/note/' + id);

    return {
      id: noteResponse.id,
      title: noteResponse.title,
      content: noteResponse.content,
    };
  }
}
