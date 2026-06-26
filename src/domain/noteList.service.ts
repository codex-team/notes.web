import type NoteRepository from '@/domain/note.repository.interface';
import type { NoteList } from './entities/NoteList';
import type NoteAttachmentUploaderRepository from './noteAttachmentUploader.repository.interface';

/**
 * NoteList Service
 */
export default class NoteListService {
  private readonly repository: NoteRepository;
  private readonly noteAttachmentRepository: NoteAttachmentUploaderRepository;

  /**
   * Note service constructor
   * @param repository - note repository
   * @param noteAttachmentRepository - repository for working with note attachments
   */
  constructor(repository: NoteRepository, noteAttachmentRepository: NoteAttachmentUploaderRepository) {
    this.repository = repository;
    this.noteAttachmentRepository = noteAttachmentRepository;
  }

  /**
   * Returns note list with metadata only (covers are not downloaded)
   * @param page - number of current pages
   * @param onlyCreatedByUser - if true, returns notes created by the user
   * @returns list of notes
   */
  public async getNoteList(page: number, onlyCreatedByUser = false): Promise<NoteList> {
    return await this.repository.getNoteList(page, onlyCreatedByUser);
  }

  /**
   * Load cover image for a single note and return its blob URL
   * @param noteId - Note identifier
   * @param coverKey - Cover file key on server
   * @returns Blob URL for the cover image, or null on error
   */
  public async loadCover(noteId: string, coverKey: string): Promise<string | null> {
    try {
      const imageData = await this.noteAttachmentRepository.load(noteId, coverKey);

      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      return URL.createObjectURL(imageData);
    } catch {
      console.log('Error while loading cover for note ', noteId);

      return null;
    }
  }
}
