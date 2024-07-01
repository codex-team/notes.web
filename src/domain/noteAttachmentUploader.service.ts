import type NoteAttachmentUploaderRepository from './noteAttachmentUploader.repository.interface';
import type { NoteId } from './entities/Note';

/**
 * Service for working with note attachments
 */
export default class NoteAttachmentUploaderService {
  private readonly repository: NoteAttachmentUploaderRepository;

  /**
   * Note service constructor
   * @param repository - note attachments repository
   */
  constructor(repository: NoteAttachmentUploaderRepository) {
    this.repository = repository;
  }

  /**
   * Upload file data as note attachment
   * @param noteId - identifier for note to make attachment
   * @param data - file binary data
   * @returns key, by which we can load it from api
   */
  public async upload(noteId: NoteId, data: Blob): Promise<string> {
    return await this.repository.upload(noteId, data);
  }

  /**
   * Load note attachment data
   * @param noteId - identifier for note to get attachment
   * @param key - file key on server side
   * @returns file binary data
   */
  public async load(noteId: NoteId, key: string): Promise<Blob> {
    return await this.repository.load(noteId, key);
  }
}
