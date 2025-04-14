<template>
  <Navbar>
    <router-link
      to="/"
      class="app-navbar-logo"
    >
      <Logo />
    </router-link>
    <Tabbar
      :tabs="tabs"
      @click="(tab) => router.push(tab.id)"
      @discard="(tab) => closeTab(tab.id)"
    />
    <Button
      link="/new"
      type="transparent"
      :icon="IconPlus"
    />
    <template #right>
      <Tabbar
        :tabs="userTab"
        @click="(tab) => {userTabClicked(tab)}"
      />
    </template>
  </Navbar>
</template>

<script lang="ts" setup>
import { IconPlus } from '@codexteam/icons';
import { Tabbar, TabParams, Navbar } from '@codexteam/ui/vue';
import Button from '@/presentation/components/button/Button.vue';
import { Logo } from '@/presentation/components/pictures';
import { useAppState } from '@/application/services/useAppState';
import useNavbar from '@/application/services/useNavbar';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import useAuth from '@/application/services/useAuth';

const router = useRouter();
const route = useRoute();
const { user } = useAppState();
const { showGoogleAuthPopup } = useAuth();

const { currentOpenedPages, deleteOpenedPageByUrl } = useNavbar();

/**
 * @todo when user clicks on + button to add new note the user should see the previous note heirarchy
 */
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
      title: 'Login',
      icon: 'User',
    }];
  } else {
    return [{
      id: '/settings',
      title: 'Settings',
      picture: user.value?.photo,
    }];
  }
});

/**
 * Handles click of the user tab
 *
 * @param tab - information of userTab
 */
function userTabClicked(tab: TabParams) {
  if (!user.value) {
    /**
     * Shows Google Authentication in a popup
     */
    showGoogleAuthPopup();
  } else {
    /**
     * Shows user settings page
     */
    router.push(tab.id);
  }
}

function closeTab(url: string) {
  deleteOpenedPageByUrl(url);

  /**
   * When tab is closed we should open previous page
   * When all tabs are closed we should open home page
   */
  if (currentOpenedPages.value.length === 0) {
    router.push('/');
  } else {
    router.push(currentOpenedPages.value[currentOpenedPages.value.length - 1].url);
  }
};

</script>

<style scoped lang="postcss">
.app-navbar-logo {
  display: flex;
  justify-content: center;
  padding: 0 var(--spacing-m) 0 var(--spacing-xs);
}
</style>
