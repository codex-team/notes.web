import type WorkspaceRepository from '@/domain/workspace.repository.interface';
import type { Page } from './entities/Page';

export default class WorkspaceService {
  private readonly repository: WorkspaceRepository;

  constructor(workspaceRepository: WorkspaceRepository) {
    this.repository = workspaceRepository;
  };

  public getOpenedPages(): Page[] | null {
    return this.repository.getOpenedPages();
  }

  public addOpenedPage(page: Page): Page {
    return this.repository.addOpenedPage(page);
  }

  public deleteOpenedPage(page: Page): void {
    this.repository.deleteOpenedPage(page);
  }

  public patchOpenedPage(page: Page): void {
    this.repository.patchOpenedPage(page);
  }
}
