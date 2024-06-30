import type NotesApiTransport from './transport/notes-api';
import generateHash from './utils/hash';
import getExtensionByMimetype from './utils/mimetypes';
import type NoteAttachmentUploaderRepositoryInterface from '@/domain/noteAttachmentUploader.repository.interface';
import type { Note } from '@/domain/entities/Note';

/**
 * Facade for interacting with files, which are note attachments
 */
export default class NoteAttachmentUploaderRepository implements NoteAttachmentUploaderRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   * @param notesApiTransport - notes api transport instance
   */
  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Upload file data as note attachment
   * @param noteId - indentifier for note to make attachment
   * @param fileData - file binary data
   * @returns key, by which we can load it from api
   */
  public async upload(noteId: Note['id'], fileData: Blob): Promise<string> {
    const form = new FormData();

    /**
     * Generate filename for form data
     */
    const fileName = generateHash();
    /**
     * Get file mime type and define extension by it
     */
    const mimeType = fileData.type;
    const fileExtension = getExtensionByMimetype(mimeType);

    if (fileExtension === null) {
      throw new Error('Mimetype of passed file is not supported');
    }

    form.set('file', fileData, `${fileName}.${fileExtension}`);

    const res = await this.transport.post<{ key: string }>(`/upload/${noteId}`, form);

    return res.key;
  }

  /**
   * Load note attachment data
   * @param noteId - indentifier for note to get attachment
   * @param key - file key on server side
   * @returns file binary data
   */
  public async load(noteId: Note['id'], key: string): Promise<Blob> {
    return await this.transport.getBlob(`/upload/${noteId}/${key}`);
  }
}
