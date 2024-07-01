<template>
  <div class="header">
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
import { useAppState } from '@/application/services/useAppState';
import useHeader from '@/application/services/useHeader';
import { useRouter, useRoute } from 'vue-router';
import { computed, watch, Ref, ref } from 'vue';
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

const userTab: Ref<TabParams[]> = ref([]);

watch(user, () => {
  /**
   * If user logouts tab becomes login tab
   */
  if (!user.value) {
    userTab.value = [{
      id: 'login',
      title: 'Login',
      icon: 'User',
    }];
  } else {
    /**
     * When user logins tab becomes user settings tab
     */
    userTab.value = [{
      id: '/settings',
      title: 'Settings',
      picture: user.value?.photo,
    }];
  };
},
{ immediate: true });

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

  &__right {
    margin-left: auto;
  }
}
</style>
