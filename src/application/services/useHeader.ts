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
   * Function for deleting record about opened page, when user closes page
   * @param url - url of closed page
   */
  deleteOpenedPageByUrl: (url: OpenedPage['url']) => void;

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param url - url of the page, that should be updated
   * @param page - new data for opened page with certain url
   */
  patchOpenedPageByUrl: (url: OpenedPage['url'], page: OpenedPage) => void;

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
  function addOpenedPage(page: OpenedPage): void {
    workspaceService.addOpenedPage(page);
  };

  /**
   * Function for deleting record about opened page, when user closes page
   * @param url - url of closed page
   */
  function deleteOpenedPageByUrl(url: OpenedPage['url']): void {
    workspaceService.deleteOpenedPageByUrl(url);
  };

  /**
   * Function for updating title of the opened page when user updated it
   * e.g. user updated note's first text block, page title should be patched
   * @param url - url of the page, that should be updated
   * @param page - new data for opened page with certain url
   */
  function patchOpenedPageByUrl(url: OpenedPage['url'], page: OpenedPage): void {
    workspaceService.patchOpenedPageByUrl(url, page);
  };

  /**
   * Hook for adding new page to storage when user changes route
   */
  router.beforeEach((currentRoute, prevRoute) => {
    /**
     * If we are created new note we should replace 'New Note' tab with tab with actual note title
     */
    if (prevRoute.path === '/new') {
      deleteOpenedPageByUrl('/new');
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
        onClose: deleteOpenedPageByUrl,
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
    deleteOpenedPageByUrl,
    patchOpenedPageByUrl,
    tabs,
  };
}
