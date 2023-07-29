<template>
  <router-link
    :to="tab.path"
    class="tab"
    :class="{'tab--active': tab.isActive}"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="tab.icon"
      class="tab__icon"
      v-html="tab.icon"
    />
    <div class="tab__title small">
      {{ tab.title }}
    </div>
    <div
      v-if="tab.isActive && tab.isPinned"
      class="tab__close"
      @click="tab.onClose"
      v-html="IconCross"
    />
  </router-link>
</template>

<script setup lang="ts">
import { IconCross } from '@codexteam/icons';
import type Tab from './types/Tab';

/**
 * Tab component props
 */
defineProps<{
  /**
   * Properties of a tab
   */
  tab: Tab
}>();
</script>

<style scoped lang="postcss">
@import '@/presentation/styles/typography.pcss';

.tab {
  @apply --text-small;

  text-decoration: none;
  max-width: var(--layout-header-tab-max-width);
  background: var(--color-bg);
  border-radius: var(--radius-m);
  padding: var(--spacing-xxs) var(--spacing-ms);
  color: var(--color-text-main);
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;

  &--active {
    color: var(--color-text-heading);
  }

  &__title {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 1;
    white-space: nowrap;
  }

  &__close {
    height: var(--size-icon);
    width: var(--size-icon);
    margin-right: -7px;
    flex-shrink: 0;
    color: var(--color-text-main);
    opacity: 30%;
  }

  &__icon {
    height: var(--size-icon);
    width: var(--size-icon);
    flex-shrink: 0;
  }
}
</style>
./types/Tab
