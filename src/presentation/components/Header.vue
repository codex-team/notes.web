<template>
  <div class="header">
    <Tabs :tabs="tabs" />
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
    isPinned: true,
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
  max-width: 100%;
}
</style>
