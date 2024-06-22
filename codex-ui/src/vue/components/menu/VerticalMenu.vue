<template>
  <div
    :class="$style['vertical-menu']"
  >
    <VerticalMenuItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :title="item.title"
      :level="item.level"
    />
  </div>
</template>
<script lang="ts" setup>
import VerticalMenuItem from './VerticalMenuItem.vue';
import type { VerticalMenuItems } from './VerticalMenuTypes.types.ts';

defineProps<{
  /**
   * Array of items for vertical menu
   */
  items: VerticalMenuItems[];
}>();
</script>
<style module>
.vertical-menu {
  border-radius: var(--radius-m);
  padding: var(--spacing-ms);
  gap: var(--spacing-very-x);
  background-color: var(--base--bg-secondary);
}
</style>
