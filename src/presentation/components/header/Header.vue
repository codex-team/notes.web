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
      <LoginButton v-if="!user" />
      <UserPanel
        v-else
        :user="user"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconPlus } from '@codexteam/icons';
import { Tabbar, TabParams } from 'codex-ui/vue';
import Button from '@/presentation/components/button/Button.vue';
import LoginButton from './HeaderLoginButton.vue';
import UserPanel from './HeaderUser.vue';
import { useAppState } from '@/application/services/useAppState';
import useHeader from '@/application/services/useHeader';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();
const { user } = useAppState();

const { currentOpenedPages, deleteOpenedPageByUrl } = useHeader();

const tabs = computed(() => currentOpenedPages.value.map((page): TabParams => {
  return {
    id: page.url,
    title: page.title,
    closable: page.title !== 'Home',
    isActive: page.url === route.path,
  };
}));

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
