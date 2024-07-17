import type { OpenedPage } from '@/domain/entities/OpenedPage';
import { PersistantStore } from './abstract/persistant';

export type OpenedPagesStoreData = {
  /**
   * Array of tabs to be stored
   */
  openedPages: OpenedPage[];
};

/**
 * Class to store all pages that are currently opened in workspace
 */
export class OpenedPagesStore extends PersistantStore<OpenedPagesStoreData> {
  constructor() {
    super(['openedPages']);
  }

  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  public addOpenedPage(page: OpenedPage): void {
    console.log(this.data.openedPages, typeof this.data.openedPages);
    const uniquePageUrls = this.data.openedPages.map(currentPage => currentPage.url);

    if (!uniquePageUrls.includes(page.url) && page.url !== '/') {
      this.data.openedPages = [
        ...this.data.openedPages,
        page,
      ];
    } else {
      /**
       * This used for calling proxy setter to update currently opened pages in domain
       */
      this.data.openedPages = this.data.openedPages;
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
   * @param url - url of the page, that should be updated
   * @param page - new data for opened page with certain url
   */
  public patchOpenedPageByUrl(url: OpenedPage['url'], page: OpenedPage): void {
    this.data.openedPages = this.data.openedPages.map((currentPage) => {
      if (currentPage.url == url) {
        currentPage.title = page.title;
      }

      return { title: currentPage.title,
        url: currentPage.url };
    });
  }
}
