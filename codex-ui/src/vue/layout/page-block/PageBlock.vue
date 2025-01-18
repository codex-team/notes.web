<template>
  <div
    class="page-block"
    :class="{
      'page-block--stretched': stretched,
    }"
  >
    <!-- Left Sidebar -->
    <div
      v-if="$slots.left"
      class="page-block__sidebar page-block__sidebar--left"
    >
      <slot name="left"></slot>
    </div>

    <!-- Center Content -->
    <div class="page-block__content">
      <slot></slot>
    </div>

    <!-- Right Sidebar -->
    <div
      v-if="$slots.right"
      class="page-block__sidebar page-block__sidebar--right"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  stretched: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="postcss">
.page-block {
  display: grid;
  grid-template-columns: var(--layout-sidebar-width) 1fr var(--layout-sidebar-width);
  gap: var(--spacing-ms);
  max-width: var(--layout-content-width);
  margin: 0 auto;

  &-stretched {
    max-width: 100%;
  }

  &__sidebar {
    width: var(--layout-sidebar-width);
  }

  &__content {
    max-width: var(--layout-content-width);
    width: 100%;
  }

  &__sidebar {

    &--left {
      width: var(--layout-sidebar-width);
    }

    &--right {
      width: var(--layout-sidebar-width);
    }
  }
}
</style>
