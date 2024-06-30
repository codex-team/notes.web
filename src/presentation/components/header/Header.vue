<template>
  <div class="header">
    <Tab
      v-for="page in currentOpenedPages"
      :key="page.url"
      :is-active="page.url === route.path"
      :title="page.title"
      :closable="page.title !== 'Home'"
      @close="closeHeaderTab(page.url)"
      @click="router.push(page.url)"
    />
    <Button
      class="header__plus"
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
import { Tab } from 'codex-ui/vue';
import Button from '@/presentation/components/button/Button.vue';
import LoginButton from './HeaderLoginButton.vue';
import UserPanel from './HeaderUser.vue';
import { useAppState } from '@/application/services/useAppState';
import useHeader from '@/application/services/useHeader';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { user } = useAppState();

const { currentOpenedPages, deleteOpenedPageByUrl } = useHeader();

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
  padding: var(--spacing-ms) var(--spacing-l);
  background-color: var(--base--bg-primary);
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  border-bottom: 1px solid var(--base--border);

  &__plus {
    margin-left: var(--spacing-ms);
  }

  &__right {
    margin-left: auto;
  }
}
</style>
