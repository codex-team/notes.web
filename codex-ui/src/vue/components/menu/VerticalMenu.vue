<template>
  <div
    :class="$style['vertical-menu']"
  >
    <VerticalMenuItem title="CodeX" />
    <VerticalMenuItem
      title="Workflow"
      :level="1"
    />
    <VerticalMenuItem
      title="Workflow"
      :level="2"
    />
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
