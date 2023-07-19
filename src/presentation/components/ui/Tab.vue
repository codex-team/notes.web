<template>
  <router-link :to="path" class="tab" :class="{'tab--active': isActive}">
    <div class="tab__icon" v-if="icon" v-html="icon"/>
    <div class="tab__title">
      {{ title }}
    </div>
    <div class="tab__close" v-if="isActive && !isDefault" v-html="IconCross" @click="onClose"/>
  </router-link>
</template>

<script setup lang="ts">
import { IconCross } from '@codexteam/icons';

/**
 * Tab component props
 */
const props = defineProps<{
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
}>();
</script>

<style scoped lang="postcss">
.tab {
  text-decoration: none;
  height: var(--header-tab-height);
  max-width: var(--header-tab-max-width);
  background: var(--bg-color-tab);
  border-radius: var(--radius-m);
  padding: var(--spacing-xxs) var(--spacing-ms);
  color: var(--text-color-header);
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;
  line-clamp: 1;

  &--active {
    color: var(--text-color-header-active);
  }

  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 1;
    white-space: nowrap;
  }

  &__close {
    height: var(--size-icon);
    width: var(--size-icon);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    color: var(--text-color-header);
    opacity: 30%;
  }

  &__icon {
    height: var(--size-icon);
    width: var(--size-icon);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
  }
}
</style>
