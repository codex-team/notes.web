<template>
  <div
    :class="[
      $style['vertical-menu-item'],
      isActive && $style['vertical-menu-item--active'],
      onActivate === undefined && $style['vertical-menu-item--static'],
      'text-ui-base-medium'
    ]"
    :style="{ '--level': props.level }"
  >
    <div
      :class="[$style['vertical-menu-item__container']]"
      @click="itemClicked"
    >
      {{ props.title }}
    </div>
  </div>
  <template v-if="items && items.length > 0">
    <VerticalMenuItem
      v-for="(childItem, index) in items"
      :key="index"
      v-bind="childItem"
      :level="level + 1"
    />
  </template>
</template>
<script lang="ts" setup>
import type { VerticalMenuItem } from './VerticalMenu.types';

const props = withDefaults(
  defineProps<VerticalMenuItem & {
    /**
     * Indentation level of the menu item
     */
    level?: number;
  }>(),
  {
    level: 1,
    isActive: false,
    items: undefined,
    onActivate: undefined,
  }
);

/**
 * Fires a callback when the item is clicked
 */
function itemClicked(): void {
  if (props.onActivate) {
    props.onActivate();
  }
}
</script>
<style lang="postcss" module>
.vertical-menu-item {
  --menuIndent: calc((var(--level) - 1) * var(--spacing-ms));

  gap: var(--spacing-ms);
  padding: 0 0 0 var(--menuIndent);

  &__container {
    cursor: pointer;
    padding: var(--spacing-s) var(--spacing-ml);
    border-radius: var(--radius-m);
  }

  &--static &__container {
    cursor: default;
    color: var(--base--text-secondary);
  }

  &:not(&--static) .vertical-menu-item__container:hover {
    background-color: var(--base--bg-secondary-hover);
  }

  &--active .vertical-menu-item__container {
    background-color: var(--base--bg-secondary-hover);

    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -2px;
      width: 5px;
      top: var(--radius-m);
      bottom: var(--radius-m);
      border-radius: var(--radius-m);
      background-color: var(--accent--solid);
    }
  }

}
</style>
