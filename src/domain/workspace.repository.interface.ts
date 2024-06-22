import type { OpenedPage } from './entities/OpenedPage';

export default interface WorkspaceRepositoryInterface {
  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  addOpenedPage: (page: OpenedPage) => void;

  /**
   * Funciton for deleting record about opened page, when user closes page
   * @param page - page that had been closed
   */
  deleteOpenedPage: (page: OpenedPage) => void;

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param page - page that had beed opened by user
   */
  patchOpenedPage: (page: OpenedPage) => void;

}
