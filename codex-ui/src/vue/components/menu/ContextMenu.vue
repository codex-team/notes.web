<template>
  <div :class="$style['context-menu']">
    <div
      v-if="showSearch"
      :class="$style['context-menu__search']"
    >
      <Input :class="$style['context-menu__input']" />
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
import type { ContextMenuItems } from './ContextMenuTypes.types.ts';
import ContextMenuItem from './ContextMenuItem.vue';

/**
 * Separator for search container
 */
const separator: ContextMenuItems = { type: 'separator' };

withDefaults(
  defineProps<{
    /**
     * If true, displays the input field for the search
     */
    showSearch?: boolean;

    /**
     * Array of items for context menu
     */
    items: ContextMenuItems[];
  }>(),
  { showSearch: false }
);

</script>

<style lang="postcss" module>
.context-menu {
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-very-x);
  width: min-content;

  &__search {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__input {
    padding: var(--v-padding) var(--h-padding);
  }

  &__scrollable {
    display: grid;
    width: max-content;
    gap: var(--spacing-very-x);
  }
}
</style>
