import type WorkspaceRepository from '@/domain/workspace.repository.interface';
import type { OpenedPage } from './entities/OpenedPage';

export default class WorkspaceService {
  private readonly repository: WorkspaceRepository;

  /**
   * Initialization of workspace repository
   * @param workspaceRepository - repository that develops information about currnetly opened pages
   */
  constructor(workspaceRepository: WorkspaceRepository) {
    this.repository = workspaceRepository;
  };

  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  public addOpenedPage(page: OpenedPage): void {
    return this.repository.addOpenedPage(page);
  }

  /**
   * Funciton for deleting record about opened page, when user closes page
   * @param page - page that had been closed
   */
  public deleteOpenedPage(page: OpenedPage): void {
    this.repository.deleteOpenedPage(page);
  }

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param page - page that had beed opened by user
   */
  public patchOpenedPage(page: OpenedPage): void {
    this.repository.patchOpenedPage(page);
  }
}
