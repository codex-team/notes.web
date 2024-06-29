import type NotesApiTransport from './transport/notes-api';
import type { Note } from '@/domain/entities/Note';
import mime from 'mime';
import type FileUploaderRepositoryInterface from '@/domain/fileUploader.repository.interface';

/**
 * Facade for interacting with files
 */
export default class FileUploaderRepository implements FileUploaderRepositoryInterface {
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
   * Upload file data
   * @param noteId - note indentifier to make attachment
   * @param fileData - file binary data
   * @param fileName - file name
   */
  public async upload(noteId: Note['id'], fileData: Blob, fileName?: string): Promise<string> {
    const form = new FormData();

    /**
     * Get file mime type and define extension by it
     */
    const mimeType = fileData.type;
    const fileExtension = mime.getExtension(mimeType);

    /**
     * Define file name, if it is not passed, use note id for name
     */
    const name = fileName ?? noteId;

    form.set('file', fileData, `${name}.${fileExtension}`);

    const res = await this.transport.post<{ key: string }>('/upload/' + noteId, form);

    return res.key;
  }

  /**
   * Load file data
   * @param key - file key on server side
   * @param noteId - identifier of note, which consists this file
   */
  public async load(key: string, noteId: Note['id']): Promise<Blob> {
    return await this.transport.get<Blob>(`/upload/${noteId}/${key}`);
  }
}
