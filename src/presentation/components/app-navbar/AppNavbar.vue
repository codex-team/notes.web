<template>
  <Navbar>
    <router-link
      to="/"
      class="app-navbar-logo"
      :title="t('home.title')"
    >
      <Logo />
    </router-link>
    <Tabbar
      :tabs="tabs"
      @click="(tab) => router.push(tab.id)"
      @discard="(tab) => closeTab(tab.id)"
    />
    <router-link
      v-if="user"
      to="/new"
      class="app-navbar-new"
      :title="t('note.new')"
      :aria-label="t('note.new')"
    >
      <Icon name="Plus" />
    </router-link>
    <template #right>
      <Tabbar
        :tabs="userTab"
        @click="userTabClicked"
      />
    </template>
  </Navbar>
</template>

<script lang="ts" setup>
import { Tabbar, TabParams, Navbar, Icon } from '@codexteam/ui/vue';
import { Logo } from '@/presentation/components/pictures';
import { useAppState } from '@/application/services/useAppState';
import useNavbar from '@/application/services/useNavbar';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import useAuth from '@/application/services/useAuth';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { user } = useAppState();
const { showGoogleAuthPopup } = useAuth();

const { currentOpenedPages, deleteOpenedPageByUrl } = useNavbar();

const tabs = computed(() => currentOpenedPages.value.map((page): TabParams => {
  return {
    id: page.url,
    title: page.title,
    closable: true,
    isActive: page.url === route.path,
  };
}));

const userTab = computed<TabParams[]>(() => {
  if (!user.value) {
    return [{
      id: 'login',
      title: t('auth.login'),
      icon: 'User',
    }];
  }

  return [{
    id: '/settings',
    title: t('userSettings.shortTitle'),
    picture: user.value.photo || undefined,
    icon: 'User',
    isActive: route.path.startsWith('/settings'),
  }];
});

/**
 * Handles click of the user tab
 */
function userTabClicked() {
  if (!user.value) {
    showGoogleAuthPopup();
  } else {
    void router.push('/settings');
  }
}

/**
 * Closes the tab and opens its neighbour, or home page if it was the last one
 *
 * @param url - url of the closed tab
 */
function closeTab(url: string) {
  const index = currentOpenedPages.value.findIndex(page => page.url === url);

  deleteOpenedPageByUrl(url);

  const pages = currentOpenedPages.value;
  const neighbour = pages[Math.min(index, pages.length - 1)];

  void router.push(neighbour?.url ?? '/');
};
</script>

<style scoped lang="postcss">
.app-navbar-logo {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 var(--spacing-m) 0 var(--spacing-xs);
}

.app-navbar-new {
  display: flex;
  flex-shrink: 0;
  padding: var(--spacing-xxs);
  margin-left: var(--spacing-xxs);
  border-radius: var(--radius-m);
  color: var(--base--text-secondary);

  &:hover {
    color: var(--base--text);
    background-color: var(--base--bg-secondary-hover);
  }
}
</style>
