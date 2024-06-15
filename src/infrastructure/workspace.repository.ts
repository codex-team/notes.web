import type { PageStore, TabStoreData } from './storage/page';
import type WorkspaceRepositoryInterface from '@/domain/workspace.repository.interface';
import type { Page, PageList } from '@/domain/entities/Page';
import Repository from './repository';

export default class WorkspaceRepository extends Repository<PageStore, TabStoreData> implements WorkspaceRepositoryInterface {
  constructor(store: PageStore) {
    super(store);
  }

  public getOpenedPages(): PageList | null {
    return this.store.getOpenedPages();
  };

  public addPage(page: Page): Page {
    return this.store.addPage(page);
  }

  public deletePage(page: Page): void {
    return this.store.deletePage(page);
  }

  public patchPage(page: Page): void {
    return this.store.patchPage(page);
  }
}
