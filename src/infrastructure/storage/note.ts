/**
 * Note data interface
 */
interface NoteData {
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
   * @returns { NoteData | undefined } - Note data
   */
  public async getNoteById(id: number): Promise<NoteData | undefined> {
    return {
      id: id,
      title: 'title' + id,
      content: 'content' + id,
    };
  }
}
