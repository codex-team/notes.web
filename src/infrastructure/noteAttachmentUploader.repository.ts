import type NotesApiTransport from './transport/notes-api';
import generateHash from './utils/hash';
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
   * @param noteId - identifier for note to make attachment
   * @param fileData - file binary data
   * @returns key, by which we can load it from api
   */
  public async upload(noteId: Note['id'], fileData: Blob): Promise<string> {
    /**
     * Generate filename for form data
     */
    const fileName = generateHash();

    const res = await this.transport.post<{ key: string }>(`/upload/${noteId}`, {}, {}, [{
      key: 'file',
      blob: fileData,
      fileName,
    }]);

    return res.key;
  }

  /**
   * Load note attachment data
   * @param noteId - identifier for note to get attachment
   * @param key - file key on server side
   * @returns file binary data
   */
  public async load(noteId: Note['id'], key: string): Promise<Blob> {
    return await this.transport.getBlob(`/upload/${noteId}/${key}`);
  }
}
