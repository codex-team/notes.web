<template>
  <div :class="$style['context-menu']">
    <div
      v-if="showSearch"
      :class="$style['context-menu__search']"
    >
      <Input
        size="small"
        icon="Search"
        placeholder="Search"
      />
      <ContextMenuItem :item="separator" />
    </div>
    <div :class="$style['context-menu__scrollable']">
      <ContextMenuItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../input/Input.vue';
import type { ContextMenuItem as Item } from './ContextMenu.types';
import ContextMenuItem from './ContextMenuItem.vue';

/**
 * Separator for search container
 */
const separator: Item = { type: 'separator' };

withDefaults(
  defineProps<{
    /**
     * If true, displays the input field for the search
     */
    showSearch?: boolean;

    /**
     * Array of items for context menu
     */
    items: Item[];
  }>(),
  { showSearch: false }
);

</script>

<style lang="postcss" module>
.context-menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-very-x);
  width: min-content;

  &__search {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__scrollable {
    display: grid;
    width: max-content;
    gap: var(--spacing-very-x);
  }
}
</style>
