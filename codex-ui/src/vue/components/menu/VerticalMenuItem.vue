<template>
  <div
    :class="$style['vertical-menu-item']"
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
  }>(),
  { level: 1 }
);
</script>
<style module>
.vertical-menu-item {
  --menuIndent: calc((var(--level) - 1) * var(--spacing-ms));

  gap: var(--spacing-ms);
  padding: 0 0 0 var(--menuIndent);

  &__container {
    padding: var(--spacing-s) var(--spacing-ml);
  }
}
</style>
