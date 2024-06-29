import type { OpenedPage } from '@/domain/entities/OpenedPage';
import { SubscribableStore } from './abstract/subscribable';

export type TabStoreData = {
  /**
   * Array of tabs to be stored
   */
  openedPages: OpenedPage[];
};

/**
 * Class to store all pages that are currently opened in workspace
 */
export class OpenedPagesStore extends SubscribableStore<TabStoreData> {
  constructor() {
    super();
    this.data.openedPages = [];
  }

  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  public addOpenedPage(page: OpenedPage): void {
    const uniquePageUrls = this.data.openedPages.map(currentPage => currentPage.url);

    if (!uniquePageUrls.includes(page.url) && page.url !== '/') {
      this.data.openedPages.push(page);
    }
  }

  /**
   * Funciton for deleting record about opened page, when user closes page
   * @param url - url of closed page
   */
  public deleteOpenedPageByUrl(url: OpenedPage['url']): void {
    this.data.openedPages = this.data.openedPages.filter(currentPage => !(currentPage.url == url));
  }

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param url
   * @param page - page that had beed opened by user
   */
  public patchOpenedPageByUrl(url: OpenedPage['url'], page: OpenedPage): void {
    const tabToUpdateIndex = this.data.openedPages.findIndex(currentPage => currentPage.url === url);

    this.data.openedPages[tabToUpdateIndex] = page;
  }
}
