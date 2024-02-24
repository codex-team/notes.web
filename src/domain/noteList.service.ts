import type NoteRepository from '@/domain/note.repository.interface';
import type { NoteList } from './entities/NoteList';

/**
 * NoteList Service
 */
export default class NoteListService {
  private readonly repository: NoteRepository;

  /**
   * Note service constructor
   *
   * @param repository - note repository
   */
  constructor(repository: NoteRepository) {
    this.repository = repository;
  }

  /**
   * Returns note list
   *
   * @param page - number of current pages
   * @returns { Promise<NoteList> } list of notes
   */
  public async getNoteList(page: number): Promise<NoteList> {
    return await this.repository.getNoteList(page);
  }
}
