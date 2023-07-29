<template>
  <div class="tabs">
    <Tab
      v-for="(tab, index) in tabs"
      :key="index"
      v-bind="tab"
    />
  </div>
</template>

<script lang="ts" setup>
import Tab from './Tab.vue';
import type TabProps from './types/Tab';

defineProps<{
  /**
   * Tabs list
   */
  tabs: TabProps[];
}>();
</script>

<style lang="postcss">
.tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(2px, auto));
  gap: var(--spacing-ms);
  max-width: 100%;
}
</style>
