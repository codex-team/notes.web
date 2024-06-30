import { Note } from "./entities/Note";

/**
 * File uploader for note attachments repository interface describes the methods
 */
export default interface NoteAttachmentUploaderRepositoryInterface {
  /**
   * Upload file data as note attachment
   * @param noteId - indentifier for note to make attachment
   * @param fileData - file binary data
   * @returns key, by which we can load it from api
   */
  upload: (noteId: Note['id'], fileData: Blob) => Promise<string>;

  /**
   * Load note attachment data
   * @param noteId - indentifier for note to get attachment
   * @param key - file key on server side
   * @returns file binary data
   */
  load: (noteId: Note['id'], key: string) => Promise<Blob>;
}
