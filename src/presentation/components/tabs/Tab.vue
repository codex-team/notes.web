<template>
  <router-link
    :to="path"
    class="tab"
    :class="{'tab--active': isActive}"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="icon"
      class="tab__icon"
      v-html="icon"
    />
    <div class="tab__title">
      {{ title }}
    </div>
    <div
      v-if="isActive && !isPinned"
      class="tab__close"
      @click="onClose"
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
defineProps<Tab>();
</script>

<style scoped lang="postcss">
@import '@/presentation/styles/typography.pcss';

.tab {
  @apply --text-small;

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
    max-width: var(--layout-tab-max-width);
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
