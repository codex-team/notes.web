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
import Tab from '@/presentation/components/tabs/Tab.vue';
import { IconPicture } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';
import TabProps from '@/presentation/components/tabs/TabProps';

const { t } = useI18n();

const tabs: TabProps[] = [
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
