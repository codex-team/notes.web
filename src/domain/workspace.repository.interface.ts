import type { Page, PageList } from './entities/Page';

export default interface WorkspaceRepositoryInterface {
  getOpenedPages: () => PageList | null;

  addPage: (page: Page) => Page;

  deletePage: (page: Page) => void;
}
