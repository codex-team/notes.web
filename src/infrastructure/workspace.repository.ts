import type { PageStore, TabStoreData } from './storage/page';
import type WorkspaceRepositoryInterface from '@/domain/workspace.repository.interface';
import type { Page } from '@/domain/entities/Page';
import Repository from './repository';

export default class WorkspaceRepository extends Repository<PageStore, TabStoreData> implements WorkspaceRepositoryInterface {
  constructor(store: PageStore) {
    super(store);
  }

  public getOpenedPages(): Page[] | null {
    return this.store.getOpenedPages();
  };

  public addOpenedPage(page: Page): Page {
    return this.store.addOpenedPage(page);
  }

  public deleteOpenedPage(page: Page): void {
    return this.store.deleteOpenedPage(page);
  }

  public patchPage(page: Page): void {
    return this.store.patchPage(page);
  }
}
