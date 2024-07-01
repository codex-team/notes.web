<template>
  <div class="tabbar">
    <Tab
      v-for="tab in tabs"
      :key="tab.identifier"
      :is-active="tab.isActive"
      :title="tab.title"
      :closable="tab.closable"
      @close="$emit('tabDiscard', tab.identifier)"
      @click="$emit('tabClicked', tab.identifier)"
    />
  </div>
</template>

<script setup lang="ts">
import { TabList, TabParams } from './Tab.types';
import Tab from './Tab.vue';

defineEmits<{
  /* eslint-disable-next-line no-unused-vars */
  (e: 'tabDiscard', identifier: TabParams['identifier']): void;
  /* eslint-disable-next-line no-unused-vars */
  (e: 'tabClicked', identifier: TabParams['identifier']): void;
}>();

defineProps<{
  tabs: TabList;
}>();

</script>

<style land="postcss">
.tabbar {
  --min-width: calc(var(--v-padding) * 2 + var(--size-icon));
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(var(--min-width), auto));
  padding: 0px var(--v-padding);
  width: 100%;
  height: 44px;
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
