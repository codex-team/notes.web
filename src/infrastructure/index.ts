import NoteRepository from '@/infrastructure/note.repository';
import NoteSettingsRepository from '@/infrastructure/noteSettings.repository';
import NoteStore from '@/infrastructure/storage/note';
import NotesApiTransport from '@/infrastructure/transport/notes-api';
import AuthRepository from '@/infrastructure/auth.repository';
import AuthStore from '@/infrastructure/storage/auth';
import UserRepository from '@/infrastructure/user.repository';
import { UserStore } from '@/infrastructure/storage/user';
import type EventBus from '@/domain/event-bus';
import { AUTH_COMPLETED_EVENT_NAME, type AuthCompletedEvent } from '@/domain/event-bus/events/AuthCompleted';
import EditorToolRepository from './tools.repository';
import { EditorToolStore } from './storage/tools';

/**
 * Repositories
 */
export interface Repositories {
  /**
   * Working with Note data
   */
  note: NoteRepository;

  /**
   * Working with Note settings data
   */
  noteSettings: NoteSettingsRepository;

  /**
   * Working with Auth data
   */
  auth: AuthRepository;

  /**
   * Working with User data
   */
  user: UserRepository;

  /**
   * Working with tools
   */

  tools: EditorToolRepository;
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
  const noteStore = new NoteStore();
  const authStore = new AuthStore();
  const userStore = new UserStore();
  const editorToolStore = new EditorToolStore();

  /**
   * Init transport
   */
  const notesApiTransport = new NotesApiTransport(noteApiUrl);

  /**
   * When we got authorized
   */
  eventBus.addEventListener(AUTH_COMPLETED_EVENT_NAME, (event: AuthCompletedEvent) => {
    if (event.detail !== null) {
      /**
       * Authorize API transport
       */
      notesApiTransport.authorize(event.detail.accessToken);

      /**
       * Save refresh token
       */
      authStore.setRefreshToken(event.detail.refreshToken);
    } else {
      /**
       * Tell API transport to continue working in anonymous mode (send waiting requests without auth)
       */
      notesApiTransport.continueAnonymous();
    }
  });

  /**
   * Init repositories
   */
  const noteRepository = new NoteRepository(noteStore, notesApiTransport);
  const noteSettingsRepository = new NoteSettingsRepository(notesApiTransport);
  const authRepository = new AuthRepository(authStore, notesApiTransport);
  const userRepository = new UserRepository(userStore, notesApiTransport);
  const editorToolRepository = new EditorToolRepository(editorToolStore, notesApiTransport);

  return {
    note: noteRepository,
    noteSettings: noteSettingsRepository,
    auth: authRepository,
    user: userRepository,
    tools: editorToolRepository,
  };
}
