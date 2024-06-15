import type { ComputedRef } from 'vue';
import { computed, onMounted, ref, toRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { AppStateController } from '@/domain';
import type { Page, PageList } from '@/domain/entities/Page';
import type { TabList } from '@/domain/entities/Tab';
import { workspaceService } from '@/domain/index';
import useNote from './useNote';

interface useHeaderComposableState {
  getOpenedPages: () => void;

  addPage: (page: Page) => void;

  deletePage: (page: Page) => void;

  patchPage: (page: Page) => void;

  tabs: ComputedRef<TabList>;
};

export default function (): useHeaderComposableState {
  const route = useRoute();

  let noteTitle = ref<string | undefined>(undefined);

  if (route.meta.pageTitle === 'New note') {
    if (typeof route.params.id === 'string') {
      const noteId = toRef(route.params.id);

      noteTitle = useNote({ id: noteId }).noteTitle;
    }
  }

  const openedPages = ref<PageList | null>(null);

  const tabs = computed<TabList>(() => {
    let activeTabs = [{
      title: 'Home',
      crossable: false,
      isActive: route.path === '/',
    }];

    const pages = openedPages.value?.map((page) => {
      return {
        title: page.title,
        crossable: true,
        isActive: route.path === page.url,
      };
    });

    if (pages !== undefined && pages !== null) {
      activeTabs.push(...pages);
    }

    return activeTabs;
  });

  const getOpenedPages = (): void => {
    openedPages.value = workspaceService.getOpenedPages();
  };

  const addPage = (page: Page): void => {
    workspaceService.addPage(page);
  };

  const deletePage = (page: Page): void => {
    workspaceService.deletePage(page);
  };

  const patchPage = (page: Page): void => {
    workspaceService.patchPage(page);
  };

  onMounted(() => {
    getOpenedPages();
  });

  watch(route, (currentRoute) => {
    addPage({ title: currentRoute.meta.pageTitle,
      url: currentRoute.path });
  });

  watch(noteTitle, (currentNoteTitle) => {
    if (currentNoteTitle !== undefined) {
      patchPage({ title: currentNoteTitle,
        url: route.path });
    }
  });

  /**
   * Subscribe to user changes in the App State
   */
  AppStateController.openedPages((prop: 'openedPages', value: PageList | null) => {
    if (prop === 'openedPages') {
      openedPages.value = value as PageList;
    }
  });

  return {
    getOpenedPages,
    addPage,
    deletePage,
    patchPage,
    tabs,
  };
}
