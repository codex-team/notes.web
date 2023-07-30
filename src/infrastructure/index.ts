import NoteRepository from '@/infrastructure/note.repository';
import NoteStorage from '@/infrastructure/storage/note';
import NotesApiTransport from '@/infrastructure/transport/notes-api';
import UserRepository from '@/infrastructure/user.repository';
import AuthStorage from '@/infrastructure/storage/auth';
import type EventBus from '@/domain/event-bus';
import type UserAuthorizedEvent from '@/domain/event-bus/events/UserAuthorized';
import { USER_AUTHORIZED_EVENT_NAME } from '@/domain/event-bus/events/UserAuthorized';

/**
 * Repositories
 */
export interface Repositories {
  /**
   * Working with Note data
   */
  note: NoteRepository;

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

  /**
   * Init transport
   */
  const notesApiTransport = new NotesApiTransport(noteApiUrl);

  /**
   * When we got authorized
   */
  eventBus.addEventListener(USER_AUTHORIZED_EVENT_NAME, (event: UserAuthorizedEvent) => {
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
  const userRepository = new UserRepository(authStorage, notesApiTransport);

  return {
    note: noteRepository,
    user: userRepository,
  };
}
