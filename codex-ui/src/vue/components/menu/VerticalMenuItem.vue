<template>
  <div
    :class="[$style['vertical-menu-item'],
             isActive && $style['vertical-menu-item--active']]"
    :style="{ '--level': props.level }"
  >
    <div
      :class="[$style['vertical-menu-item__container']]"
    >
      {{ props.title }}
      <div v-if="items && items.length > 0">
        <VerticalMenuItem
          v-for="(childItem, index) in items"
          :key="index"
          :title="childItem.title"
          :is-active="childItem.isActive"
          :items="childItem.items"
          :level="level + 1"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { VerticalMenuItem as Item } from './VerticalMenuTypes.types.ts';

const props = withDefaults(
  defineProps<{
    /**
     * Level of the vertical item
     */
    level: number;

    /**
     * Primary text of the menu item
     */
    title: string;

    /**
     * Current item state
     */
    isActive?: boolean;

    /**
     * List of child elements for current element
     */
    items?: Item[];
  }>(),
  {
    level: 1,
    isActive: false,
    items: undefined,
  }
);
</script>
<style module>
.vertical-menu-item {
  --menuIndent: calc((var(--level) - 1) * var(--spacing-ms));

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
    border-left: 3px solid var(--accent--solid);
    border-radius: var(--radius-m);
  }

}
</style>
