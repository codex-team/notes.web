<template>
  <Button
    :text="title"
    :icon="icon"
    :link="path"
    class="tab"
    :class="{'tab--active': isActive}"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="isActive && !isPinned"
      class="tab__close"
      @click.stop.prevent="onClose"
      v-html="IconCross"
    />
  </Button>
</template>

<script setup lang="ts">
import { IconCross } from '@codexteam/icons';
import type Tab from './types/Tab';
import Button from '@/presentation/components/button/Button.vue';

/**
 * Tab component props
 */
defineProps<Tab>();
</script>

<style scoped lang="postcss">
@import '@/presentation/styles/typography.pcss';

.tab {
  &--active {
    color: var(--color-text-heading);
  }

  :deep(.button__text) {
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
}
</style>
./types/Tab
