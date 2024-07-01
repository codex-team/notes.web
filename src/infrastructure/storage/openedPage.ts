import type { OpenedPage } from '@/domain/entities/OpenedPage';
import { SubscribableStore } from './abstract/subscribable';

export type OpenedPagesStoreData = {
  /**
   * Array of tabs to be stored
   */
  openedPages: OpenedPage[];
};

/**
 * Class to store all pages that are currently opened in workspace
 */
export class OpenedPagesStore extends SubscribableStore<OpenedPagesStoreData> {
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
      this.data.openedPages = [
        ...this.data.openedPages,
        page,
      ];
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

  /**
   * Deletes all pages with title that contains substring
   * e.g. deletes pages of the note and noteSettings with noteId passed
   * @param substring - string whose occurrence is checked in page titles
   */
  public deletePagesBySubstring(substring: string): void {
    const regexp = new RegExp(`/*${substring}*`);

    this.data.openedPages = this.data.openedPages.filter(currentPage => (currentPage.url.match(regexp) !== null));
  }
}
