import NoteService from './note.service';
import { init as initRepositories } from '../infrastructure';

/**
 * Init repositories
 */
const repositories = initRepositories('http://localhost:3000');

/**
 * Init services
 */
const noteService = new NoteService(repositories.noteRepository);

export {
  noteService
};

