import NoteService from '@domain/note.service';
import { init as initRepositories } from '@infrastructure/index';

/**
 * Init repositories
 */
const repositories = initRepositories();

/**
 * Init services
 */
const noteService = new NoteService(repositories.noteRepository);

export {
  noteService
};

