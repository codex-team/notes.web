<template>
  <div :class="[$style.tab, `${$style.tab}--${state}`]">
    <div v-if="showLeftSlot">
      <slot />
    </div>
    <div :class="[$style['tab__center'], 'text-ui-base-medium']">
      {{ name }}
    </div>
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
    showCross: false,
    showLeftSlot: false
  }
);
</script>

<style module>
.tab {
  width: max-content;
  display: flex;
  border-radius: var(--radius-m);

  --bg: var(--base--bg-secondary);
  --color: var(--classic-text-secondary);
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  /**
   * States
   */
  &--default {
    --bg: var(--base--bg-secondary);
    --color: var(--base-text-secondary);
  }

  &--hover {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base-text-secondary);
  }

  &--current {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base--text-solid-foreground);
  }

  padding: var(--v-padding) var(--h-padding) var(--v-padding) var(--h-padding);
  background-color: var(--bg);
  color: var(--color);
}
</style>
