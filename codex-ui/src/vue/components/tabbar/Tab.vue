<template>
  <div :class="[$style.tab, 'text-ui-base-medium']">
    <template
      v-if="picture || icon"
    >
      <template v-if="picture">
        <img
          :src="picture"
          :class="[$style['tab__image']]"
        >
      </template>
      <template v-else-if="icon">
        <div :class="[$style['tab__icon']]">
          <Icon
            :name="icon"
            :width="20"
            :height="20"
          />
        </div>
      </template>
    </template>

    {{ title }}
    <template
      v-if="closable"
    >
      <Icon :name="'Cross'" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { IsActive } from './Tab.types';
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
    isActive: IsActive;

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
  min-height: var(--size-icon);
  width: max-content;
  display: flex;
  gap: var(--v-padding);
  border-radius: var(--radius-m);
  cursor: pointer;
  font-family: inherit;

  --bg: var(--base--bg-secondary);
  --color: var(--base--text-secondary);

  /**
   * States
   */
  &:hover {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base--text-secondary);
  }

  &__current {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base--text-solid-foreground);
  }

  padding: var(--v-padding) var(--h-padding) var(--v-padding) var(--h-padding);
  background-color: var(--bg);

  &__image {
    height: var(--size-icon);
    width: var(--size-icon);
    border-radius: var(--radius-s);
  }

  &__icon {
    height: var(--size-icon);
    width: var(--size-icon);
  }
}
</style>
