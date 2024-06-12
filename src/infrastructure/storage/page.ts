import type { Page, PageList } from '@/domain/entities/Page';
import { SubscribableStore } from './abstract/subscribable';

export type TabStoreData = {
  /**
   * Array of tabs to be stored
   */
  openedPages: PageList;
};

export class PageStore extends SubscribableStore<TabStoreData> {
  public getOpenedPages(): PageList | null {
    return this.data.openedPages;
  }

  public addPage(page: Page): Page {
    this.data.openedPages = [...this.data.openedPages, page];

    return page;
  }

  public deletePage(page: Page): void {
    this.data.openedPages = this.data.openedPages.filter(currentPage => !(currentPage.url == page.url));
  }
}
