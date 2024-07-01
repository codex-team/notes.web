<template>
  <div class="tabbar">
    <Tab
      v-for="tab in tabs"
      :key="tab.id"
      v-bind="tab"
      @close="$emit('discard', tab)"
      @click="$emit('click', tab)"
    />
  </div>
</template>

<script setup lang="ts">
import { TabList, TabParams } from './Tab.types';
import Tab from './Tab.vue';

defineEmits<{
  click: [tab: TabParams];
  discard: [tab: TabParams];
}>();

defineProps<{
  tabs: TabList;
}>();

</script>

<style land="postcss">
.tabbar {
  --min-width: calc(var(--v-padding) * 2 + var(--size-icon));
  display: flex;
  padding: 0px var(--v-padding);
  width: 100%;
  min-height: var(--size-icon);
  border-radius: var(--radius-ml);
  gap: var(--spacing-xs);

  overflow-x: auto;
  white-space: nowrap;

  /**
   * Do not display scrollbars for IE and Edge
   */
  -ms-overflow-style: none;

  /**
   * Do not display scrollbars for firefox
   */
  scrollbar-width: none;
}

.tabbar::-webkit-scrollbar {
  /**
   * Do not display scrollbars for chrome safari and opera
   */
  display: none;

}
</style>
