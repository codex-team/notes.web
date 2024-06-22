import type WorkspaceRepository from '@/domain/workspace.repository.interface';
import type { OpenedPage } from './entities/OpenedPage';

export default class WorkspaceService {
  private readonly repository: WorkspaceRepository;

  constructor(workspaceRepository: WorkspaceRepository) {
    this.repository = workspaceRepository;
  };

  public addOpenedPage(page: OpenedPage): OpenedPage {
    return this.repository.addOpenedPage(page);
  }

  public deleteOpenedPage(page: OpenedPage): void {
    this.repository.deleteOpenedPage(page);
  }

  public patchOpenedPage(page: OpenedPage): void {
    this.repository.patchOpenedPage(page);
  }
}
