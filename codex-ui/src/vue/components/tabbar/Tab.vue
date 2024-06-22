<template>
  <div
    :class="[
      $style.tab,
      'text-ui-base-medium',
      isActive && $style['tab--active']
    ]"
  >
    <div
      :class="[
        $style['tab__body'],
      ]"
    >
      <template v-if="picture">
        <img
          :src="picture"
          :class="[$style['tab__body-image']]"
        >
      </template>
      <template v-else-if="icon">
        <div :class="[$style['tab__body-icon']]">
          <Icon
            :name="icon"
            :width="20"
            :height="20"
          />
        </div>
      </template>
      {{ title }}
      <Icon
        v-if="$props.onClose !== undefined"
        :name="'Cross'"
        @click="$props.onClose && $props.onClose($props)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import type { TabParams } from './Tab.types';

withDefaults(
  defineProps<{
    /**
     * Name of the tab item
     */
    title: string;

    /**
     * If true we have cross icon on the right
     */
    onClose?: (tab: TabParams) => void;

    /**
     * Current tab state
     */
    isActive?: boolean;

    /**
     * Link to image to be displayed in the left slot, else undefined
     */
    picture?: string;

    /**
     * Name of the icon to be diplayed in the left slot, else undefined
     */
    icon?: string;

    url: string;
  }>(),
  {
    isActive: false,
    picture: undefined,
    icon: undefined,
    closable: undefined,
    onClose: undefined,
  }
);
</script>

<style module>
.tab {
  padding: var(--v-padding) 0;
  position: relative;
  display: inline-block;
  width: max-content;

  &__body {
    min-height: var(--size-icon);
    display: flex;
    gap: var(--v-padding);
    border-radius: var(--radius-m);
    cursor: pointer;
    font-family: inherit;

    padding: var(--v-padding) var(--h-padding);
    background-color: var(--bg);
    color: var(--color);

    --bg: var(--base--bg-secondary);
    --color: var(--base--text-secondary);

    /**
     * States
     */
    &:hover {
      --bg: var(--base--bg-secondary-hover);
    }

    &-image {
      height: var(--size-icon);
      width: var(--size-icon);
      border-radius: var(--radius-s);
    }

    &-icon {
      height: var(--size-icon);
      width: var(--size-icon);
    }
  }

  &--active .tab__body {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base--text);

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: var(--spacing-very-x);
      background-color: var(--accent--solid);
      border-radius: var(--radius-s) var(--radius-s) 0 0;
    }
  }
}
</style>
