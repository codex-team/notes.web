import NoteService from './note.service';
import { Repositories } from '../infrastructure';

/**
 * Services
 */
interface Services {
    /**
     * Note service
     */
    noteService: NoteService;
}

/**
 * Init domains
 *
 * @param repositories - Repositories
 * @returns { Services } - domain services
 */
export function init(repositories: Repositories): Services {
  /**
   * Init services
   */
  const noteService = new NoteService(repositories.noteRepository);

  return {
    noteService: noteService,
  };
}