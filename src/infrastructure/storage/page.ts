import type { Page } from '@/domain/entities/Page';
import { SubscribableStore } from './abstract/subscribable';

export type TabStoreData = {
  /**
   * Array of tabs to be stored
   */
  openedPages: Page[];
};

export class PageStore extends SubscribableStore<TabStoreData> {
  constructor() {
    super();
    this.data.openedPages = [];
  }

  public addOpenedPage(page: Page): Page {
    const uniquePageUrls = this.data.openedPages.map(currentPage => currentPage.url);

    if (!uniquePageUrls.includes(page.url) && page.url !== '/') {
      this.data.openedPages.push(page);
    }

    console.log('added');
    console.log(this.data.openedPages);

    return page;
  }

  public deleteOpenedPage(page: Page): void {
    this.data.openedPages = this.data.openedPages.filter(currentPage => !(currentPage.url == page.url));

    console.log('deleted');
    console.log(this.data.openedPages);
  }

  public patchOpenedPage(page: Page): void {
    this.data.openedPages = this.data.openedPages.map((currentPage) => {
      if (currentPage.url == page.url) {
        currentPage.title = page.title;
      }

      console.log('patched');
      console.log(this.data.openedPages);

      return { title: currentPage.title,
        url: currentPage.url };
    });
  }
}
