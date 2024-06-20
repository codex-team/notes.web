import type { Note } from '@/domain/entities/Note';

/**
 * Note storage
 */
export default class NoteStorage {
  /**
   * Get note by id
   * @param publicId - Note publicId
   * @returns - Note data
   */
  public getNoteById(publicId: string): Note | null {
    console.log('Get note by publicId', publicId);

    return null;
  }

  /**
   * Get note by hostname
   * @param hostname - Custom hostname
   * @returns - Note data
   */
  public getNoteByHostname(hostname: string): Note | null {
    console.log('Get note by hostname', hostname);

    return null;
  }

  /**
   * Insert note
   * @param note - note to insert
   */
  public insertNote(note: Note): void {
    console.log('Insert note', note);

    return;
  }
}
