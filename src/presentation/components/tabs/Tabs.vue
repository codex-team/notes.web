<template>
  <div class="tabs">
    <Tab
      v-for="tab in tabs"
      :key="tab.path"
      v-bind="tab"
    />
  </div>
</template>

<script lang="ts" setup>
import Tab from './Tab.vue';
import type TabProps from './types/Tab';

const tabs = defineProps<{
  /**
   * Tabs list
   */
  tabs: TabProps[];
}>();
</script>
