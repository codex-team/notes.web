import NoteRepository from '@/infrastructure/note.repository';
import NoteSettingsRepository from '@/infrastructure/noteSettings.repository';
import NoteStore from '@/infrastructure/storage/note';
import NotesApiTransport from '@/infrastructure/transport/notes-api';
import AuthRepository from '@/infrastructure/auth.repository';
import AuthStore from '@/infrastructure/storage/auth';
import UserRepository from '@/infrastructure/user.repository';
import WorkspaceRepository from '@/infrastructure/workspace.repository';
import MarketplaceRepository from '@/infrastructure/marketplace.repository';
import { UserStore } from '@/infrastructure/storage/user';
import { OpenedPagesStore } from '@/infrastructure/storage/openedPage';
import type EventBus from '@/domain/event-bus';
import { AUTH_COMPLETED_EVENT_NAME, type AuthCompletedEvent } from '@/domain/event-bus/events/AuthCompleted';
import { AUTH_LOGOUT_EVENT_NAME } from '@/domain/event-bus/events/AuthLogoutEvent';
import { EditorToolsStore } from '@/infrastructure/storage/editorTools.ts';
import EditorToolsRepository from '@/infrastructure/editorTools.repository';
import EditorToolsTransport from '@/infrastructure/transport/editorTools.transport';
import NoteAttachmentUploaderRepository from './noteAttachmentUploader.repository';
import TeamRepository from '@/infrastructure/team.repository';

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
   * Working with marketplace tools data
   */
  marketplace: MarketplaceRepository;

  /**
   * Working with editor tools data
   */
  editorTools: EditorToolsRepository;

  /**
   * Working with note attachments
   */
  noteAttachmentUploader: NoteAttachmentUploaderRepository;

  /**
   * Working with all pages user is currently using
   */
  workspace: WorkspaceRepository;

  /**
   * Working with teams
   */
  team: TeamRepository;
}

/**
 * Init repositories
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
  const editorToolsStore = new EditorToolsStore();
  const openedPagesStore = new OpenedPagesStore();

  /**
   * Init transport
   */
  const notesApiTransport = new NotesApiTransport(noteApiUrl);
  const editorToolsTransport = new EditorToolsTransport();

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

      console.log('removed user');

      userStore.removeUser();
    }
  });
  /**
   * When we got unauthorized
   */
  eventBus.addEventListener(AUTH_LOGOUT_EVENT_NAME, () => {
    /**
     * Tell API transport to continue working in anonymous mode (send waiting requests without auth)
     */
    authStore.removeRefreshToken();
    notesApiTransport.continueAnonymous();
  });

  /**
   * Init repositories
   */
  const noteRepository = new NoteRepository(noteStore, notesApiTransport);
  const noteSettingsRepository = new NoteSettingsRepository(notesApiTransport);
  const authRepository = new AuthRepository(authStore, notesApiTransport);
  const userRepository = new UserRepository(userStore, notesApiTransport);
  const marketplaceRepository = new MarketplaceRepository(notesApiTransport);
  const editorToolsRepository = new EditorToolsRepository(editorToolsStore, editorToolsTransport);
  const noteAttachmentUploaderRepository = new NoteAttachmentUploaderRepository(notesApiTransport);
  const workspaceRepository = new WorkspaceRepository(openedPagesStore);
  const teamRepository = new TeamRepository(notesApiTransport);

  return {
    note: noteRepository,
    noteSettings: noteSettingsRepository,
    auth: authRepository,
    user: userRepository,
    marketplace: marketplaceRepository,
    editorTools: editorToolsRepository,
    noteAttachmentUploader: noteAttachmentUploaderRepository,
    workspace: workspaceRepository,
    team: teamRepository,
  };
}
