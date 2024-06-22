<template>
  <div
    :class="$style['vertical-menu']"
  >
    <VerticalMenuItem title="CodeX" />
  </div>
</template>
<script lang="ts" setup>
import VerticalMenuItem from './VerticalMenuItem.vue';
</script>
<style module>
.vertical-menu {
  border-radius: var(--radius-m);
  padding: var(--spacing-ms);
  gap: var(--spacing-very-x);
  background-color: var(--base--bg-secondary);
}
</style>
