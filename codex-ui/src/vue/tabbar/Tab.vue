<template>
  <div :class="[$style.tab]">
    <div v-if="src">
      <img
        :src="src"
        :class="[$style['tab__left__image']]"
      />
    </div>
    <div v-else-if="icon">
      <Icon :name="icon" />
    </div>
    <div :class="[$style['tab__center'], 'text-ui-base-medium']">
      {{ name }}
    </div>
    <div v-if="showCross">
      <Icon
        :name="'Cross'"
        :class="[$style['tab__right']]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabState } from './Tab.types';
import Icon from '../icon/Icon.vue';

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
     * Current tab state
     */
    state: TabState;

    /**
     * If we have image in the left slot
     */
    src?: string;

    /**
     * If we have icon in the left slot
     */
    icon?: string;
  }>(),
  {
    state: 'default',
    src: undefined,
    icon: undefined,
    showCross: false,
  }
);
</script>

<style module>
.tab {
  min-height: var(--size-icon);
  width: max-content;
  display: flex;
  gap: var(--v-padding);
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

    &__image {
      height: var(--size-icon);
      width: var(--size-icon);
      border-radius: var(--radius-s);
    }
  }

  &__right {
    display: flex;
    align-items: center;
  }
}
</style>
