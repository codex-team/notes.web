import type { Page } from './entities/Page';

export default interface WorkspaceRepositoryInterface {
  addOpenedPage: (page: Page) => Page;

  deleteOpenedPage: (page: Page) => void;

  patchOpenedPage: (page: Page) => void;
}
