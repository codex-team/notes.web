<template>
  <div
    :class="[$style['vertical-menu-item'],
             isActive && $style['vertical-menu-item--active'],
             'text-ui-base-medium']"
    :style="{ '--level': props.level }"
    @click="itemClicked"
  >
    <div
      :class="[$style['vertical-menu-item__container']]"
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

  cursor: pointer;
  gap: var(--spacing-ms);
  padding: 0 0 0 var(--menuIndent);

  &__container {
    padding: var(--spacing-s) var(--spacing-ml);
    border-radius: var(--radius-m);

    &:hover {
      background-color: var(--base--bg-secondary-hover);
    }
  }

  &--active .vertical-menu-item__container {
    background-color: var(--base--bg-secondary-hover);
    box-shadow: inset 3px 0 0 var(--accent--solid);
    border-radius: var(--radius-m);
  }

}
</style>
