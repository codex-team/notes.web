<template>
  <router-link
    :to="path"
    class="tab"
    :class="{'tab--active': isActive}"
  >
    <div
      v-if="icon"
      class="tab__icon"
      v-html="icon"
    />
    <div class="tab__title small">
      {{ title }}
    </div>
    <div
      v-if="isActive && !isDefault"
      class="tab__close"
      @click="onClose"
      v-html="IconCross"
    />
  </router-link>
</template>

<script setup lang="ts">
import { IconCross } from '@codexteam/icons';

interface TabProps {
  /**
   * Tab title
   */
  title: string;

  /**
   * Tab icon
   */
  icon?: string;

  /**
   * Is tab active
   */
  isActive?: boolean;

  /**
   * Link path
   */
  path: string;

  /**
   * Is tab default, in other words, can't be closed
   */
  isDefault?: boolean;

  /**
   * On close callback
   */
  onClose?: () => void;
}

/**
 * Tab component props
 */
defineProps<TabProps>();
</script>

<style scoped lang="postcss">
.tab {
  text-decoration: none;
  max-width: var(--layout-header-tab-max-width);
  background: var(--bg-color-tab);
  border-radius: var(--radius-m);
  padding: var(--spacing-xxs) var(--spacing-ms);
  color: var(--color-text-main);
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;
  line-clamp: 1;

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
