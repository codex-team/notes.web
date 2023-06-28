import NoteRepository from './note.repository';
import NoteStorage from './storage/note';

/**
 * Repositories
 */
export interface Repositories {
    /**
     * Note repository
     */
    noteRepository: NoteRepository;
}

/**
 * Init repositories
 *
 * @returns { Repositories } - Repositories
 */
export function init(): Repositories {
  /**
   * Init storages
   */
  const noteStorage = new NoteStorage();

  /**
   * Init repositories
   */
  const noteRepository = new NoteRepository(noteStorage);

  return {
    noteRepository: noteRepository,
  };
}