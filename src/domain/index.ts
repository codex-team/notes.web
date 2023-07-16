import NoteService from './note.service';
import { init as initRepositories } from '../infrastructure';

/**
 * Get API url from environment
 */
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Init repositories
 */
const repositories = initRepositories(apiUrl);

/**
 * Init services
 */
const noteService = new NoteService(repositories.noteRepository);

export {
  noteService
};

