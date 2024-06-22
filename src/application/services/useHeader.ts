import type { ComputedRef } from 'vue';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AppStateController } from '@/domain';
import type { OpenedPage } from '@/domain/entities/OpenedPage';
import type { TabList } from '@/domain/entities/Tab';
import { workspaceService } from '@/domain/index';
import { notEmpty } from '@/infrastructure/utils/empty';

interface useHeaderComposableState {
  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  addOpenedPage: (page: OpenedPage) => void;

  /**
   * Funciton for deleting record about opened page, when user closes page
   * @param page - page that had been closed
   */
  deleteOpenedPage: (page: OpenedPage) => void;

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param page - page that had beed opened by user
   */
  patchOpenedPage: (page: OpenedPage) => void;

  /**
   * There would be stored all formatted tabs for tabbar inside header
   */
  tabs: ComputedRef<TabList>;
};

export default function (): useHeaderComposableState {
  const router = useRouter();
  const route = useRoute();

  const openedPages = ref<OpenedPage[] | null>(null);

  /**
   * Function for adding record to opened pages storage when user opens new page
   * @param page - page that had beed opened by user
   */
  const addOpenedPage = (page: OpenedPage): void => {
    workspaceService.addOpenedPage(page);
  };

  /**
   * Funciton for deleting record about opened page, when user closes page
   * @param page - page that had been closed
   */
  const deleteOpenedPage = (page: OpenedPage): void => {
    workspaceService.deleteOpenedPage(page);
  };

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param page - page that had beed opened by user
   */
  const patchOpenedPage = (page: OpenedPage): void => {
    workspaceService.patchOpenedPage(page);
  };

  /**
   * Hook for adding new page to storage when user changes route
   */
  router.beforeEach((currentRoute, prevRoute) => {
    if (prevRoute.path === '/new') {
      deleteOpenedPage({
        title: 'New note',
        url: '/new',
      });
    }

    addOpenedPage({ title: currentRoute.meta.pageTitle,
      url: currentRoute.path });
  });

  /**
   * Subscribe to page changes in the use Header
   */
  AppStateController.openedPages((prop: 'openedPages', value: OpenedPage[] | null) => {
    if (prop === 'openedPages') {
      openedPages.value = value as OpenedPage[];
    }
  });

  const tabs = computed<TabList>(() => {
    let activeTabs = [{
      title: 'Home',
      url: '/',
      isActive: route.path === '/',
    }];

    const pages = openedPages.value?.map((page) => {
      return {
        title: page.title,
        onClose: deleteOpenedPage,
        url: page.url,
        isActive: route.path === page.url,
      };
    });

    if (notEmpty(pages)) {
      activeTabs.push(...pages);
    }

    return activeTabs;
  });

  return {
    addOpenedPage,
    deleteOpenedPage,
    patchOpenedPage,
    tabs,
  };
}
