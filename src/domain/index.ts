import NoteService from '@/domain/note.service';
import AuthService from '@/domain/auth.service';
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
const authService = new AuthService(eventBus, repositories.auth);
const userService = new UserService(eventBus, repositories.user);

export {
  noteService,
  authService,
  userService
};

