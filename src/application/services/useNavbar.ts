import type { ComputedRef } from 'vue';
import { computed, onScopeDispose, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createSharedComposable } from '@vueuse/core';
import { AppStateController } from '@/domain';
import type { OpenedPage } from '@/domain/entities/OpenedPage';
import { workspaceService } from '@/domain/index';
import { useI18n } from 'vue-i18n';

interface useNavbarComposableState {
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
   * Delete opened pages whose url starts with the prefix, e.g. all pages of a deleted note
   * @param prefix - url prefix
   */
  deleteOpenedPagesByPrefix: (prefix: string) => void;

  /**
   * There would be stored all currently opened pages
   */
  currentOpenedPages: ComputedRef<OpenedPage[]>;
};

/**
 * Only notes are opened in tabs
 */
const NOTE_PAGE = /^\/note\/[\w-]+$/;

/**
 * Older tabs are closed when there are more
 */
const MAX_TABS = 10;

/**
 * Function for composing data for Navbar
 * Shared, so the router hook and the store subscription are registered once for the whole app
 * @returns data used in Navbar and functions for composing data used in Navbar
 */
export default createSharedComposable((): useNavbarComposableState => {
  const router = useRouter();
  const { t } = useI18n();

  const openedPages = ref<OpenedPage[]>([]);

  /**
   * Function for deleting record about opened page, when user closes page
   * @param url - url of closed page
   */
  function deleteOpenedPageByUrl(url: OpenedPage['url']): void {
    workspaceService.deleteOpenedPageByUrl(url);
  };

  /**
   * Function for updating title of the opened page when user updated it
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
   * Delete opened pages whose url starts with the prefix
   * @param prefix - url prefix
   */
  function deleteOpenedPagesByPrefix(prefix: string): void {
    openedPages.value
      .filter(page => page.url === prefix || page.url.startsWith(`${prefix}/`))
      .forEach(page => deleteOpenedPageByUrl(page.url));
  }

  /**
   * Hook for adding new page to storage when user changes route
   */
  const removeRouterHook = router.beforeResolve((currentRoute) => {
    if (!NOTE_PAGE.test(currentRoute.path)) {
      return;
    }

    workspaceService.addOpenedPage({
      title: t(currentRoute.meta.pageTitleI18n),
      url: currentRoute.path,
    });

    const notePages = openedPages.value.filter(page => NOTE_PAGE.test(page.url));

    [
      ...openedPages.value.filter(page => !NOTE_PAGE.test(page.url)),
      ...notePages.slice(0, Math.max(0, notePages.length - MAX_TABS)),
    ].forEach(page => deleteOpenedPageByUrl(page.url));
  });

  onScopeDispose(removeRouterHook);

  /**
   * Subscribe to page changes in the use Navbar
   */
  AppStateController.openedPages((prop: 'openedPages', value: OpenedPage[] | null) => {
    if (prop === 'openedPages') {
      openedPages.value = value ?? [];
    }
  });

  return {
    deleteOpenedPageByUrl,
    patchOpenedPageByUrl,
    currentOpenedPages: computed(() => openedPages.value),
    deleteOpenedPages,
    deleteOpenedPagesByPrefix,
  };
});
