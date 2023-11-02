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
   * Returns note list by creator id
   *
   * @param userId - user id
   * @param page - number of current pages
   * @returns { Promise<NoteList> } list of notes
   */
  public async getNoteListByCreatorId(userId: number, page: number): Promise<NoteList> {
    return {
      items: (await this.repository.getNoteListByCreatorId(userId, page)).items,
    };
  }
};
