import NoteRepository from '@/infrastructure/note.repository';
import NoteStorage from '@/infrastructure/storage/note';
import NotesApiTransport from '@/infrastructure/transport/notes-api';
import AuthRepository from '@/infrastructure/auth.repository';
import AuthStorage from '@/infrastructure/storage/auth';
import UserRepository from '@/infrastructure/user.repository';
import { UserStore } from '@/infrastructure/storage/user';
import type EventBus from '@/domain/event-bus';
import type AuthCompletedEvent from '@/domain/event-bus/events/AuthCompleted';
import { AUTH_COMPLETED_EVENT_NAME } from '@/domain/event-bus/events/AuthCompleted';

/**
 * Repositories
 */
export interface Repositories {
  /**
   * Working with Note data
   */
  note: NoteRepository;

  /**
   * Working with Auth data
   */
  auth: AuthRepository;

  /**
   * Working with User data
   */
  user: UserRepository;
}

/**
 * Init repositories
 *
 * @param noteApiUrl - Note API url
 * @param eventBus - Common domain event bus
 */
export function init(noteApiUrl: string, eventBus: EventBus): Repositories {
  /**
   * Init storages
   */
  const noteStorage = new NoteStorage();
  const authStorage = new AuthStorage();
  const userStorage = new UserStore();

  /**
   * Init transport
   */
  const notesApiTransport = new NotesApiTransport(noteApiUrl);

  /**
   * When we got authorized
   */
  eventBus.addEventListener(AUTH_COMPLETED_EVENT_NAME, (event: AuthCompletedEvent) => {
    /**
     * Authorize API transport
     */
    notesApiTransport.authorize(event.detail.accessToken);

    /**
     * Save refresh token
     */
    authStorage.setRefreshToken(event.detail.refreshToken);
  });

  /**
   * Init repositories
   */
  const noteRepository = new NoteRepository(noteStorage, notesApiTransport);
  const authRepository = new AuthRepository(authStorage, notesApiTransport);
  const userRepository = new UserRepository(userStorage, notesApiTransport);

  return {
    note: noteRepository,
    auth: authRepository,
    user: userRepository,
  };
}
