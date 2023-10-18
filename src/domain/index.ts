import NoteService from '@/domain/note.service';
import NoteSettingsService from '@/domain/noteSettings.service';
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
const noteSettingsService = new NoteSettingsService(repositories.noteSettings);
const authService = new AuthService(eventBus, repositories.auth);
const userService = new UserService(eventBus, repositories.user);

/**
 * App State — is a read-only combination of app Stores.
 * Allows to subscribe to store data changes
 */
export const AppStateController = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  user: (callback: Parameters<typeof repositories.user.setStoreChangeCallback>[0]) => repositories.user.setStoreChangeCallback(callback),
};

export {
  noteService,
  noteSettingsService,
  authService,
  userService
};

