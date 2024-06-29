import type { Note } from './entities/Note';

/**
 * File uploader repository interface describes the methods
 */
export default interface FileUploaderRepositoryInterface {
  /**
   * Upload file data
   * @param noteId - note indentifier to make attachment
   * @param fileData - file binary data
   * @param fileName - file name
   */
  upload: (noteId: Note['id'], fileData: Blob, fileName?: string) => Promise<string>;

  /**
   * Load file data
   * @param key - file key on server side
   * @param noteId - identifier of note, which contains this file
   */
  load: (key: string, noteId: Note['id']) => Promise<Blob>;
}
