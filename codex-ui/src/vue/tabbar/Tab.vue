<template>
  <div :class="[$style.tab, `${$style.tab}--${state}`]">
    <div v-if="showLeftSlot"></div>
  </div>
</template>

<script setup lang="ts">
import { TabState } from './Tab.types';

withDefaults(
  defineProps<{
    /**
     * Name of the tab item
     */
    name: string;

    /**
     * If true we have cross icon on the right
     */
    showCross?: boolean;

    /**
     * If true we have slot on the left
     */
    showLeftSlot?: boolean;

    /**
     * Current tab state
     */
    state: TabState;
  }>(),
  {
    state: 'default',
  }
);
</script>

<style module>
.tab {
  width: max-content;

  &--default {
    background-color: var(--base--bg-secondary);
  }

  &--hover {
    background-color: var(--base--bg-secondary-hover);
  }

  &--current {
    background-color: var(--base--bg-secondary-hover);
  }
}
</style>
