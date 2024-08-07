<template>
  <div class="header">
    <router-link
      to="/"
      class="header__logo"
    >
      <Logo />
    </router-link>
    <Tabbar
      :tabs="tabs"
      @click="(tab) => router.push(tab.id)"
      @discard="(tab) => closeHeaderTab(tab.id)"
    />
    <Button
      link="/new"
      type="transparent"
      :icon="IconPlus"
    />
    <div class="header__right">
      <Tabbar
        :tabs="userTab"
        @click="(tab) => {userTabClicked(tab)}"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconPlus } from '@codexteam/icons';
import { Tabbar, TabParams } from 'codex-ui/vue';
import Button from '@/presentation/components/button/Button.vue';
import { Logo } from '@/presentation/components/pictures';
import { useAppState } from '@/application/services/useAppState';
import useHeader from '@/application/services/useHeader';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import useAuth from '@/application/services/useAuth';

const router = useRouter();
const route = useRoute();
const { user } = useAppState();
const { showGoogleAuthPopup } = useAuth();

const { currentOpenedPages, deleteOpenedPageByUrl } = useHeader();

const tabs = computed(() => currentOpenedPages.value.map((page): TabParams => {
  return {
    id: page.url,
    title: page.title,
    closable: page.title !== 'Home',
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

function closeHeaderTab(url: string) {
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
.header {
  background-color: var(--base--bg-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  border-bottom: 1px solid var(--base--border);
  overflow: hidden;

  &__logo {
    display: flex;
    justify-content: center;
    padding: 0 var(--spacing-xl);
  }

  &__right {
    margin-left: auto;
  }
}
</style>
