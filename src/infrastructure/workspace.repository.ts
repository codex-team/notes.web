import type { OpenedPagesStore, TabStoreData } from './storage/openedPage';
import type WorkspaceRepositoryInterface from '@/domain/workspace.repository.interface';
import type { OpenedPage } from '@/domain/entities/OpenedPage';
import Repository from './repository';

export default class WorkspaceRepository extends Repository<OpenedPagesStore, TabStoreData> implements WorkspaceRepositoryInterface {
  /**
   * Initialization of opened pages storage
   * @param store - storage where all information about opened pages is stored
   */
  constructor(store: OpenedPagesStore) {
    super(store);
  }

  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  public addOpenedPage(page: OpenedPage): void {
    return this.store.addOpenedPage(page);
  }

  /**
   * Funciton for deleting record about opened page, when user closes page
   * @param page - page that had been closed
   */
  public deleteOpenedPage(page: OpenedPage): void {
    return this.store.deleteOpenedPage(page);
  }

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param page - page that had beed opened by user
   */
  public patchOpenedPage(page: OpenedPage): void {
    return this.store.patchOpenedPage(page);
  }
}
