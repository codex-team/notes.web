import type { ComputedRef } from 'vue';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { AppStateController } from '@/domain';
import type { OpenedPage } from '@/domain/entities/OpenedPage';
import type { TabList } from '@/domain/entities/Tab';
import { workspaceService } from '@/domain/index';
import { notEmpty } from '@/infrastructure/utils/empty';

interface useHeaderComposableState {
  addOpenedPage: (page: OpenedPage) => void;

  deleteOpenedPage: (page: OpenedPage) => void;

  patchOpenedPage: (page: OpenedPage) => void;

  tabs: ComputedRef<TabList>;
};

export default function (): useHeaderComposableState {
  const route = useRoute();

  const openedPages = ref<OpenedPage[] | null>(null);

  const addOpenedPage = (page: OpenedPage): void => {
    workspaceService.addOpenedPage(page);
  };

  const deleteOpenedPage = (page: OpenedPage): void => {
    workspaceService.deleteOpenedPage(page);
  };

  const patchOpenedPage = (page: OpenedPage): void => {
    workspaceService.patchOpenedPage(page);
  };

  watch(route, (currentRoute, prevRoute) => {
    console.log('new route!!!!!!!!!');
    console.log(currentRoute, prevRoute);
    addOpenedPage({ title: currentRoute.meta.pageTitle,
      url: currentRoute.path });
  });

  /**
   * Subscribe to user changes in the App State
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
