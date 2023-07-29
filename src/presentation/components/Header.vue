<template>
  <div class="header">
    <div class="header__tabs">
      <Tabs :tabs="tabs" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { IconPicture } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';
import type Tab from './tabs/types/Tab';
import Tabs from './tabs/Tabs.vue';

const { t } = useI18n();

const tabs: Tab[] = [
  {
    title: t('home.title'),
    path: '/',
    icon: IconPicture,
    isActive: true,
  },
];
</script>

<style scoped lang="postcss">
.header {
  padding: var(--spacing-ms) var(--spacing-l);
  background-color: var(--color-bg-header);
  display: flex;
  align-items: center;
  width: 100%;

  &__tabs {
    display: flex;
    gap: var(--spacing-ms);
  }
}
</style>
