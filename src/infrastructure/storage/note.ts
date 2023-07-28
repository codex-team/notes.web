import type Note from '@/domain/entities/Note';

/**
 * Note storage
 */
export default class NoteStorage {
  /**
   * Note storage constructor
   */
  constructor() {
    console.log('Created note storage');
  }

  /**
   * Get note by id
   *
   * @param id - Note id
   * @returns { Note | null } - Note data
   */
  public async getNoteById(id: number): Promise<Note | null> {
    console.log('Get note by id', id);

    return null;
  }

  /**
   * Insert note
   *
   * @param note - note to insert
   */
  public async insertNote(note: Note): Promise<void> {
    console.log('Insert note', note);

    return;
  }
}
