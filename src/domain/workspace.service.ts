import type WorkspaceRepository from '@/domain/workspace.repository.interface';
import type { Page, PageList } from './entities/page';

export default class WorkspaceService {
  private readonly repository: WorkspaceRepository;

  constructor(workspaceRepository: WorkspaceRepository) {
    this.repository = workspaceRepository;
  };

  public getOpenedPages(): PageList | null {
    return this.repository.getOpenedPages();
  }

  public addPage(page: Page): Page {
    return this.repository.addPage(page);
  }

  public deletePage(page: Page): void {
    this.repository.deletePage(page);
  }
}
