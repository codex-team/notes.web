<template>
  <div
    :class="[$style['vertical-menu-item'],
             props.isActive && $style['vertical-menu-item--active']]"
    :style="{ '--level': props.level }"
  >
    <div :class="$style['vertical-menu-item__container']">
      {{ props.title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
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
  }>(),
  {
    level: 1,
    isActive: false,
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

    &:hover {
      background-color: var(--base--bg-secondary-hover);
      border-radius: var(--radius-m);
    }

    &--active .vertical-menu-item__container {
      background-color: var(--base--bg-secondary-hover);

      &::after {
        border-left: 3px solid var(--accent--solid);
      }
    }
  }
}
</style>
