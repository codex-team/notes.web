import NoteRepositoryInterface from '../domain/note.repository.interface';
import Note from '../domain/entities/Note';
import NoteStorage from './storage/note';

/**
 * Note repository
 */
export default class NoteRepository implements NoteRepositoryInterface {
  /**
   * Note storage
   */
  private noteStorage: NoteStorage;

  /**
   * Note repository constructor
   *
   * @param noteStorage - note storage instance
   */
  constructor(noteStorage: NoteStorage) {
    this.noteStorage = noteStorage;
  }

  /**
   * Get note by id
   *
   * @param id - Note id
   * @returns { Note | undefined } - Note instance
   */
  public async getNoteById(id: number): Promise<Note | undefined> {
    const noteData = await this.noteStorage.getNoteById(id);

    /**
     * If note data exists
     */
    if (!noteData) {
      return;
    }

    return new Note(noteData.title, noteData.content, noteData.id);
  }
}