import NoteService from '@/domain/note.service';
import UserService from '@/domain/user.service';
import { init as initRepositories } from '@/infrastructure';
import EventBus from './event-bus';

/**
 * Get API url from environment
 */
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Create common event bus
 */
const eventBus = new EventBus();

/**
 * Init repositories
 */
const repositories = initRepositories(apiUrl, eventBus);

/**
 * Init services
 */
const noteService = new NoteService(repositories.note);
const userService = new UserService(eventBus, repositories.user);

export {
  noteService,
  userService
};

