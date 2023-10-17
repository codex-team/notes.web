import type { Note } from '@/domain/entities/Note';

/**
 * Note storage
 */
export default class NoteStorage {
  /**
   * Get note by id
   *
   * @param publicId - Note publicId
   * @returns { Note | null } - Note data
   */
  public async getNoteById(publicId: string): Promise<Note | null> {
    console.log('Get note by publicId', publicId);

    return null;
  }

  /**
   * Get note by hostname
   *
   * @param hostname - Custom hostname
   * @returns { Note | null } - Note data
   */
  public async getNoteByHostname(hostname: string): Promise<Note | null> {
    console.log('Get note by hostname', hostname);

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
