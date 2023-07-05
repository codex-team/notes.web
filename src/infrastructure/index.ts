import NoteRepository from './note.repository';
import NoteStorage from './storage/note';
import Transport from './transport';

/**
 * Repositories
 */
export interface Repositories {
  /**
   * Note repository
   *
   */
  noteRepository: NoteRepository;
}

/**
 * Init repositories
 *
 * @param noteApiUrl - Note API url
 * @returns { Repositories } - Repositories
 */
export function init(noteApiUrl: string): Repositories {
  /**
   * Init storages
   */
  const noteStorage = new NoteStorage();

  /**
   * Init transport
   */
  const transport = new Transport(noteApiUrl);

  /**
   * Init repositories
   */
  const noteRepository = new NoteRepository(noteStorage, transport);

  return {
    noteRepository: noteRepository,
  };
}
