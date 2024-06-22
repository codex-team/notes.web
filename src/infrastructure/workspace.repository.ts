import type { PageStore, TabStoreData } from './storage/openedPage';
import type WorkspaceRepositoryInterface from '@/domain/workspace.repository.interface';
import type { OpenedPage } from '@/domain/entities/OpenedPage';
import Repository from './repository';

export default class WorkspaceRepository extends Repository<PageStore, TabStoreData> implements WorkspaceRepositoryInterface {
  constructor(store: PageStore) {
    super(store);
  }

  public addOpenedPage(page: OpenedPage): OpenedPage {
    return this.store.addOpenedPage(page);
  }

  public deleteOpenedPage(page: OpenedPage): void {
    return this.store.deleteOpenedPage(page);
  }

  public patchOpenedPage(page: OpenedPage): void {
    return this.store.patchOpenedPage(page);
  }
}
