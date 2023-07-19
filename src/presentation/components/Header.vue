<template>
  <div class="header">
    <div class="header__tabs">
      <Tab v-for="tab in tabs" :title="tab.title" :path="tab.path" :icon="tab.icon" :isDefault="tab.isDefault" :isActive="tab.isActive" :onClose="tab.onClose" :key="tab.path"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tab from './ui/Tab.vue';

/**
 * Header component props
 */
const props = defineProps<{
  /**
   * Header tabs
   */
  tabs: {
    /**
     * Tab title
     */
    title: string;

    /**
     * Link path
     */
    path: string;

    /**
     * Tab icon
     */
    icon?: string;

    /**
     * Is tab default, in other words, can't be closed
     */
    isDefault?: boolean;

    /**
     * Is tab active
     */
    isActive?: boolean;

    /**
     * On close callback
     */
    onClose?: () => void;
  }[];
}>();
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
