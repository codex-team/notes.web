import type { ComputedRef } from 'vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { AppStateController } from '@/domain';
import type { Page } from '@/domain/entities/Page';
import type { TabList } from '@/domain/entities/Tab';
import { workspaceService } from '@/domain/index';
import { notEmpty } from '@/infrastructure/utils/empty';

interface useHeaderComposableState {
  getOpenedPages: () => void;

  addOpenedPage: (page: Page) => void;

  deleteOpenedPage: (page: Page) => void;

  patchOpenedPage: (page: Page) => void;

  tabs: ComputedRef<TabList>;
};

export default function (): useHeaderComposableState {
  const route = useRoute();

  const openedPages = ref<Page[] | null>(null);

  const getOpenedPages = (): void => {
    openedPages.value = workspaceService.getOpenedPages();
  };

  const addOpenedPage = (page: Page): void => {
    workspaceService.addOpenedPage(page);
  };

  const deleteOpenedPage = (page: Page): void => {
    workspaceService.deleteOpenedPage(page);
  };

  const patchOpenedPage = (page: Page): void => {
    workspaceService.patchOpenedPage(page);
  };

  onMounted(() => {
    getOpenedPages();
  });

  watch(route, (currentRoute) => {
    addOpenedPage({ title: currentRoute.meta.pageTitle,
      url: currentRoute.path });
  });

  /**
   * Subscribe to user changes in the App State
   */
  AppStateController.openedPages((prop: 'openedPages', value: Page[] | null) => {
    if (prop === 'openedPages') {
      openedPages.value = value as Page[];
    }
  });

  const tabs = computed<TabList>(() => {
    let activeTabs = [{
      title: 'Home',
      isActive: route.path === '/',
    }];

    const pages = openedPages.value?.map((page) => {
      return {
        title: page.title,
        onClose: deleteOpenedPage,
        isActive: route.path === page.url,
      };
    });

    if (notEmpty(pages)) {
      activeTabs.push(...pages);
    }

    return activeTabs;
  });

  return {
    getOpenedPages,
    addOpenedPage,
    deleteOpenedPage,
    patchOpenedPage,
    tabs,
  };
}
