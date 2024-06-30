<template>
  <div class="header">
    <Tab
      v-for="tab in tabs"
      :key="tab.url"
      :is-active="tab.isActive"
      :title="tab.title"
      :closable="(tab.title !== 'Home') ? true : false"
      @close="closeHeaderTab(tab.url)"
      @click="$router.push(tab.url)"
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
import { TabParams } from '@/domain/entities/Tab';
import Button from '@/presentation/components/button/Button.vue';
import LoginButton from './HeaderLoginButton.vue';
import UserPanel from './HeaderUser.vue';
import { useAppState } from '@/application/services/useAppState';
import useHeader from '@/application/services/useHeader';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useAppState();

const { tabs, deleteOpenedPageByUrl } = useHeader();

function closeHeaderTab(url: TabParams['url']) {
  deleteOpenedPageByUrl(url);

  /**
   * When tab is closed we should open previous page
   * When all tabs are closed we should open home page
   */
  if (tabs.value.length === 0) {
    router.push('/');
  } else {
    router.push(tabs.value[tabs.value.length - 1].url);
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
