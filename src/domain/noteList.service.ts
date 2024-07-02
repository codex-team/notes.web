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
   * @returns list of notes
   */
  public async getNoteList(page: number): Promise<NoteList> {
    const noteList = await this.repository.getNoteList(page);

    /**
     * Note list with valid image urls in cover
     */
    const parsedNoteList: NoteList = {
      items: [],
    };

    for (const note of noteList.items) {
      /**
       * If note has no cover, we have no need to load it
       */
      if (note.cover === null) {
        parsedNoteList.items.push(note);
        continue;
      }

      /**
       * Cover object url for passing to the element
       */
      let objUrl: string | null = null;

      try {
        const imageData = await this.noteAttachmentRepository.load(note.id, note.cover);

        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        objUrl = URL.createObjectURL(imageData);
      } catch {
        console.log('Error while loading cover for note ', note.id);
      }

      parsedNoteList.items.push({
        ...note,
        cover: objUrl,
      });
    }

    return parsedNoteList;
  }
}
