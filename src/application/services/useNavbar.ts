import type { ComputedRef } from 'vue';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AppStateController } from '@/domain';
import type { OpenedPage } from '@/domain/entities/OpenedPage';
import { workspaceService } from '@/domain/index';
import { useI18n } from 'vue-i18n';
import { notEmpty } from '@/infrastructure/utils/empty';

interface useNavbarComposableState {
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
   * Delete all opened pages
   */
  deleteOpenedPages: () => void;

  /**
   * There would be stored all currently opened pages
   */
  currentOpenedPages: ComputedRef<OpenedPage[]>;
};

/**
 * Function for composing data for Navbar
 * @returns data used in Navbar and functions for composing data used in Navbar
 */
export default function useNavbar(): useNavbarComposableState {
  const router = useRouter();
  const route = useRoute();
  const { t } = useI18n();

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
   * Delete all opened pages
   */
  function deleteOpenedPages(): void {
    workspaceService.deleteOpenedPages();
  }

  /**
   * Hook for adding new page to storage when user changes route
   */
  router.beforeResolve((currentRoute, prevRoute) => {
    /**
     * If we are created new note we should replace 'New Note' tab with tab with actual note title
     */
    if (prevRoute.meta.discardTabOnLeave === true) {
      deleteOpenedPageByUrl(route.path);
    }

    /**
     * If the route is '/' do not add the page
     */
    if (currentRoute.path !== '/') {
      addOpenedPage({ title: t(currentRoute.meta.pageTitleI18n),
        url: currentRoute.path });
    }
  });

  /**
   * Subscribe to page changes in the use Navbar
   */
  AppStateController.openedPages((prop: 'openedPages', value: OpenedPage[] | null) => {
    if (prop === 'openedPages') {
      openedPages.value = value as OpenedPage[];
    }
  });

  /**
   * Home page is always opened
   */
  const currentOpenedPages = computed<OpenedPage[]>(() => {
    const activePages = [];

    const pages = openedPages.value?.map((page) => {
      return {
        title: page.title,
        url: page.url,
      };
    });

    if (notEmpty(pages)) {
      activePages.push(...pages);
    }

    return activePages;
  });

  return {
    addOpenedPage,
    deleteOpenedPageByUrl,
    patchOpenedPageByUrl,
    currentOpenedPages,
    deleteOpenedPages,
  };
}
