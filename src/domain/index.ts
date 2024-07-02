import NoteService from '@/domain/note.service';
import NoteSettingsService from '@/domain/noteSettings.service';
import AuthService from '@/domain/auth.service';
import UserService from '@/domain/user.service';
import MarketplaceService from '@/domain/marketplace.service';
import { init as initRepositories } from '@/infrastructure';
import EventBus from './event-bus';
import NoteListService from './noteList.service';
import EditorToolsService from '@/domain/editorTools.service';
import WorkspaceService from './workspace.service';
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
const editorToolsService = new EditorToolsService(repositories.editorTools);
const workspaceService = new WorkspaceService(repositories.workspace);
const noteListService = new NoteListService(repositories.note);
const noteSettingsService = new NoteSettingsService(repositories.noteSettings, repositories.noteAttachmentUploader);
const authService = new AuthService(eventBus, repositories.auth);
const userService = new UserService(eventBus, repositories.user);
const marketplaceService = new MarketplaceService(repositories.marketplace);

/**
 * App State — is a read-only combination of app Stores.
 * Allows to subscribe to store data changes
 */
export const AppStateController = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  user: (callback: Parameters<typeof repositories.user.setStoreChangeCallback>[0]) =>
    repositories.user.setStoreChangeCallback(callback),

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  openedPages: (callback: Parameters<typeof repositories.workspace.setStoreChangeCallback>[0]) =>
    repositories.workspace.setStoreChangeCallback(callback),
};

export {
  editorToolsService,
  noteService,
  noteListService,
  noteSettingsService,
  authService,
  userService,
  marketplaceService,
  workspaceService
};
