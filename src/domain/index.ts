import NoteService from '@/domain/note.service';
import { init as initRepositories } from '@/infrastructure';

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

