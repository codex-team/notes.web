<template>
  <div :class="$style['item']">
    <div
      v-if="item.type === 'default'"
      :class="[$style['item__default']]"
    >
      <div :class="$style['item__body']">
        <Icon
          v-if="item.icon !== undefined"
          :name="item.icon"
        />
        <div>
          {{ item.title }}
        </div>
      </div>
    </div>
    <div
      v-if="item.type === 'separator'"
      :class="$style['item__separator']"
    >
      <div :class="$style['item__line']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import type { ContextMenuItems } from './ContextMenuTypes.types.js';

defineProps<{
  /**
   * Context menu item, can be default or separator
   */
  item: ContextMenuItems;
}>();
</script>

<style module>
.item {
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  &__separator {
    padding: var(--spacing-very-x) var(--spacing-xxs);
  }

  &__line {
    align-self: stretch;
    background: var(--base--border);
    height: var(--delimiter-height);
  }

  &__default {
    gap: var(--v-padding);
    border-radius: var(--radius-m);
    padding: var(--v-padding) var(--h-padding);
  }

  &__default:hover {
    background-color: var(--base--bg-secondary-hover);
    cursor: pointer;
  }

  &__body {
    display: flex;
    align-items: center;
    min-height: var(--size-icon);
    gap: var(--spacing-s);
  }
}
</style>
