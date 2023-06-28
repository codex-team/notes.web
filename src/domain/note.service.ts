import NoteRepository from './note.repository.interface';

/**
 * Note data
 */
interface NoteData {
    /**
     * Note id
     */
    id: number;

    /**
     * Note title
     */
    title: string;

    /**
     * Note content
     */
    content: string;
}

/**
 * Note Service
 */
export default class NoteService {
  /**
   * Note repository
   */
  private readonly noteRepository: NoteRepository;

  /**
   * Note Service constructor
   *
   * @param noteRepository - Note repository instance
   */
  constructor(noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  /**
   * Get note
   *
   * @param id - Note id
   * @returns { NoteData | undefined } - Note data
   */
  public async getNoteById(id: number): Promise<NoteData | undefined> {
    const note = await this.noteRepository.getNoteById(id);

    return {
      id: note.id,
      title: note.title,
      content: note.content,
    };
  }
}