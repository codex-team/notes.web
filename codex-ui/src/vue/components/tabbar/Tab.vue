<template>
  <div
    :class="[
      $style.tab,
      'text-ui-base-medium',
    ]"
  >
    <div
      :class="[
        $style['tab__body'],
        isActive && $style['tab__body--active']
      ]"
    >
      <template v-if="picture">
        <img
          :src="picture"
          :class="[$style['tab__body__image']]"
        >
      </template>
      <template v-else-if="icon">
        <div :class="[$style['tab__body__icon']]">
          <Icon
            :name="icon"
            :width="20"
            :height="20"
          />
        </div>
      </template>
      {{ title }}
      <Icon
        v-if="closable"
        :name="'Cross'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { tabActiveState } from './Tab.types';
import Icon from '../icon/Icon.vue';

withDefaults(
  defineProps<{
    /**
     * Name of the tab item
     */
    title: string;

    /**
     * If true we have cross icon on the right
     */
    closable?: boolean;

    /**
     * Current tab state
     */
    isActive: tabActiveState;

    /**
     * Link to image to be displayed in the left slot, else undefined
     */
    picture?: string;

    /**
     * Name of the icon to be diplayed in the left slot, else undefined
     */
    icon?: string;
  }>(),
  {
    isActive: false,
    picture: undefined,
    icon: undefined,
    closable: false,
  }
);
</script>

<style module>
.tab {
  &__body {
    position: relative;
    min-height: var(--size-icon);
    display: inline-block;
    width: max-content;
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

    &__image {
      height: var(--size-icon);
      width: var(--size-icon);
      border-radius: var(--radius-s);
    }

    &__icon {
      height: var(--size-icon);
      width: var(--size-icon);
    }

    &--active {
      --bg: var(--base--bg-secondary-hover);
      --color: var(--base--text);

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: calc(-1 * var(--spacing-xs));
        width: 100%;
        height: var(--spacing-very-x);
        background-color: var(--accent--solid);
        border-radius: var(--radius-s) var(--radius-s) 0 0;
      }
    }
  }
}
</style>
