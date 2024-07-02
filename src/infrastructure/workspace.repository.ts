import type { OpenedPagesStore, OpenedPagesStoreData } from './storage/openedPage';
import type WorkspaceRepositoryInterface from '@/domain/workspace.repository.interface';
import type { OpenedPage } from '@/domain/entities/OpenedPage';
import Repository from './repository';

export default class WorkspaceRepository extends Repository<OpenedPagesStore, OpenedPagesStoreData> implements WorkspaceRepositoryInterface {
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
   * @param url - url of closed page
   */
  public deleteOpenedPageByUrl(url: OpenedPage['url']): void {
    return this.store.deleteOpenedPageByUrl(url);
  }

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param url - url of the page, that should be updated
   * @param page - new data for opened page with certain url
   */
  public patchOpenedPageByUrl(url: OpenedPage['url'], page: OpenedPage): void {
    return this.store.patchOpenedPageByUrl(url, page);
  }
}
