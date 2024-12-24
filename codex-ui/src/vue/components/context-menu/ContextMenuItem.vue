<template>
  <div :class="$style['context-menu-item']">
    <div
      v-if="item.type === 'default' || !item.type"
      :class="[$style['context-menu-item__default']]"
      @click="item.onActivate"
    >
      <div
        :class="$style['context-menu-item__body']"
      >
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
      :class="$style['context-menu-item__separator']"
    >
      <div :class="$style['context-menu-item__line']" />
    </div>
    <div
      v-if="item.type === 'message'"
      :class="[$style['context-menu-item__default'],
               $style['context-menu-item__default--no-hover']]"
    >
      {{ item.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import type { ContextMenuItem } from './ContextMenu.types';

defineProps<{
  /**
   * Context menu item, can be default or separator
   */
  item: ContextMenuItem;
}>();
</script>

<style lang="postcss" module>
.context-menu-item {
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

    &--no-hover {
      cursor: default;
    }
  }

  .context-menu-item__default:not(.context-menu-item__default--no-hover):hover {
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
