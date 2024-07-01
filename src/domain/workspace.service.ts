import type WorkspaceRepository from '@/domain/workspace.repository.interface';
import type { OpenedPage } from './entities/OpenedPage';
import type { NoteId } from '@/domain/entities/Note';

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
   * @param url - url of closed page
   */
  public deleteOpenedPageByUrl(url: OpenedPage['url']): void {
    this.repository.deleteOpenedPageByUrl(url);
  }

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param url - url of the page, that should be updated
   * @param page - new data for opened page with certain url
   */
  public patchOpenedPageByUrl(url: OpenedPage['url'], page: OpenedPage): void {
    this.repository.patchOpenedPageByUrl(url, page);
  }

  /**
   * Delete related to note pages (note and noteSettings)
   * Used on note deletion
   * @param id - id of currenly deleted note
   */
  public deleteNoteRelatedPages(id: NoteId): void {
    this.repository.deleteNoteRelatedPages(id);
  }
}
