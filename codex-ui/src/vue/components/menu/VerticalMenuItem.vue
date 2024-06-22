<template>
  <div
    :class="$style['vertical-menu-item']"
  >
    {{ props.title }}
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
     * Item title
     */
    title: string;
  }>(),
  { level: 1 }
);
</script>
<style module>
.vertical-menu-item {
  gap: var(--spacing-ms);
}
</style>
