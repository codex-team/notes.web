<template>
  <div :class="[$style.tab]">
    <div
      v-if="$slots.left_image"
      :class="[$style['tab__left']]"
    >
      <slot name="left" :content="leftContent"/>
    </div>
    <div :class="[$style['tab__center'], 'text-ui-base-medium']">
      {{ name }}
    </div>
    <div v-if="showCross">
      <slot name="right"/>
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
  cursor: pointer;

  --bg: var(--base--bg-secondary);
  --color: var(--base-text-secondary);
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  /**
   * States
   */
  &__hover {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base-text-secondary);
  }

  &__current {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base--text-solid-foreground);
  }

  padding: var(--v-padding) var(--h-padding) var(--v-padding) var(--h-padding);
  background-color: var(--bg);
  color: var(--color);

  &__center {
    display: flex;
    align-items: center;
  }

  &__left {
    display: flex;
    align-items: center;
    height: var(--size-icon);
    width: var(--size-icon);
  }
}
</style>
