import type { Page } from '@/domain/entities/Page';
import { SubscribableStore } from './abstract/subscribable';

export type TabStoreData = {
  /**
   * Array of tabs to be stored
   */
  openedPages: Page[];
};

export class PageStore extends SubscribableStore<TabStoreData> {
  public getOpenedPages(): Page[] | null {
    return this.data.openedPages;
  }

  public addOpenedPage(page: Page): Page {
    this.data.openedPages = [...this.data.openedPages, page];

    return page;
  }

  public deleteOpenedPage(page: Page): void {
    this.data.openedPages = this.data.openedPages.filter(currentPage => !(currentPage.url == page.url));
  }

  public patchOpenedPage(page: Page): void {
    this.data.openedPages = this.data.openedPages.map((currentPage) => {
      if (currentPage.url == page.url) {
        currentPage.title = page.title;
      }

      return { title: currentPage.title,
        url: currentPage.url };
    });
  }
}
