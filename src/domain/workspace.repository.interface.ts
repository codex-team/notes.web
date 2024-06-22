import type { OpenedPage } from './entities/OpenedPage';

export default interface WorkspaceRepositoryInterface {
  addOpenedPage: (page: OpenedPage) => OpenedPage;

  deleteOpenedPage: (page: OpenedPage) => void;

  patchOpenedPage: (page: OpenedPage) => void;
}
