<template>
  <div class="header">
    <div class="header__tabs">
      <Tab
        v-for="tab in tabs"
        :key="tab.path"
        :title="tab.title"
        :path="tab.path"
        :icon="tab.icon"
        :is-pinned="tab.isPinned"
        :is-active="tab.isActive"
        :on-close="tab.onClose"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tab from './ui/Tab.vue';
import { IconPicture } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const tabs = [
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
  height: var(--layout-header-height);
  padding: var(--spacing-ms) var(--spacing-l);
  background-color: var(--bg-color-header);
  display: flex;
  align-items: center;
  width: 100%;

  &__tabs {
    display: flex;
    gap: var(--spacing-ms);
  }
}
</style>
