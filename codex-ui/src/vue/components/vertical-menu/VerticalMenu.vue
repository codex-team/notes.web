<template>
  <div
    :class="$style['vertical-menu']"
  >
    <VerticalMenuItem
      v-for="(item, index) in items"
      :key="index"
      v-bind="item"
    />
  </div>
</template>
<script lang="ts" setup>
import VerticalMenuItem from './VerticalMenuItem.vue';
import type { VerticalMenuItem as Item } from './VerticalMenu.types';

defineProps<{
  /**
   * Array of items for vertical menu
   */
  items: Item[];
}>();
</script>
<style lang="postcss" module>
.vertical-menu {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-m);
  padding: var(--spacing-ms);
  gap: var(--spacing-very-x);
  background-color: var(--base--bg-secondary);
  width: max-content;
}
</style>
