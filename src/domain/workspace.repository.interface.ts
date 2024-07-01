import type { OpenedPage } from './entities/OpenedPage';
import type { NoteId } from '@/domain/entities/Note';

export default interface WorkspaceRepositoryInterface {
  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  addOpenedPage: (page: OpenedPage) => void;

  /**
   * Funciton for deleting record about opened page, when user closes page
   * @param url - url of closed page
   */
  deleteOpenedPageByUrl: (url: OpenedPage['url']) => void;

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param url - url of the page, that should be updated
   * @param page - new data for opened page with certain url
   */
  patchOpenedPageByUrl: (url: OpenedPage['url'], page: OpenedPage) => void;

  /**
   * Delete related to note pages (note and noteSettings)
   * Used on note deletion
   * @param id - id of currenly deleted note
   */
  deleteNoteRelatedPages: (id: NoteId) => void;
}
