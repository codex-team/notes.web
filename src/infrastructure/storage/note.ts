import Note from '../../domain/entities/Note';

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
   * @returns { Note | undefined } - Note data
   */
  public async getNoteById(id: number): Promise<Note | undefined> {
    return {
      id: id,
      title: 'title' + id,
      content: 'content' + id,
    };
  }
}
