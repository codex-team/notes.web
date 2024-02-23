<template>
  <div class="header">
    <Tabs :tabs="tabs" />
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
import { IconPicture, IconPlus, IconMenu } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';
import type Tab from '@/presentation/components/tabs/types/Tab';
import Tabs from '@/presentation/components/tabs/Tabs.vue';
import Button from '@/presentation/components/button/Button.vue';
import LoginButton from './HeaderLoginButton.vue';
import UserPanel from './HeaderUser.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAppState } from '@/application/services/useAppState';

const { t } = useI18n();
const { currentRoute } = useRouter();
const { user } = useAppState();

const tabs = computed<Tab[]>(() => {
  const availableTabs = [
    {
      title: t('header.buttons.home'),
      path: '/',
      icon: IconPicture,
      isActive: currentRoute.value.name === 'home',
      isPinned: true,
    },
  ];

  /**
   * Show inactive settings tab when we are on note view
   */
  if (currentRoute.value.name === 'note') {
    availableTabs.push({
      title: t('header.buttons.noteSettings'),
      path: currentRoute.value.path + '/settings',
      icon: IconMenu,
      isActive: false,
      isPinned: true,
    });
  }

  /**
   * Show active settings tab when we are on settings itself
   */
  if (currentRoute.value.name === 'settings') {
    availableTabs.push({
      title: t('header.buttons.noteSettings'),
      path: currentRoute.value.path,
      icon: IconMenu,
      isActive: true,
      isPinned: true,
    });
  }

  return availableTabs;
});
</script>

<style scoped lang="postcss">
.header {
  padding: var(--spacing-ms) var(--spacing-l);
  background-color: var(--color-bg-header);
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;

  &__plus {
    margin-left: var(--spacing-ms);
  }

  &__right {
    margin-left: auto;
  }
}
</style>
