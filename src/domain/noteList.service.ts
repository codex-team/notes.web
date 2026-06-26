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
   * Returns note list
   * @todo - move loading images data logic to separate service for optimization
   * @param page - number of current pages
   * @param onlyCreatedByUser - if true, returns notes created by the user
   * @returns list of notes
   */
  public async getNoteList(page: number, onlyCreatedByUser = false): Promise<NoteList> {
    const noteList = await this.repository.getNoteList(page, onlyCreatedByUser);

    /**
     * Load cover image for a single note in parallel
     * @param note - Note entity
     * @returns Note with cover blob URL (or null cover on error)
     */
    const loadCover = async (note: NoteList['items'][number]): Promise<NoteList['items'][number]> => {
      if (note.cover === null) {
        return note;
      }

      try {
        const imageData = await this.noteAttachmentRepository.load(note.id, note.cover);

        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const objUrl = URL.createObjectURL(imageData);

        return {
          ...note,
          cover: objUrl,
        };
      } catch {
        console.log('Error while loading cover for note ', note.id);

        return note;
      }
    };

    /**
     * Load all cover images in parallel
     */
    const parsedNoteList: NoteList = {
      items: await Promise.all(noteList.items.map(loadCover)),
    };

    return parsedNoteList;
  }
}
