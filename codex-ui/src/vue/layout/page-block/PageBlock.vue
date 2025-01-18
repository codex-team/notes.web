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
      class="page-block__sidebar"
    >
      <slot name="left" />
    </div>

    <!-- Center Content -->
    <div
      class="page-block__content"
    >
      <slot />
    </div>

    <!-- Right Sidebar -->
    <div
      v-if="$slots.right"
      class="page-block__sidebar"
    >
      <slot name="right" />
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
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  &--stretched {
    justify-content: stretch;
  }

  &__content {
    width: var(--layout-content-width);
    padding: var(--spacing-xxl) var(--spacing-ml);
    box-sizing: border-box;
  }

  &__sidebar {
    box-sizing: border-box;
    padding: var(--spacing-xxl) var(--spacing-ml);
    width: var(--layout-sidebar-width);
  }
}
</style>
