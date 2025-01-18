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
      :class="{'page-block__content--stretched': stretched}"
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
    max-width: var(--layout-content-width);
    padding: var(--spacing-xxl) var(--spacing-ml);
    box-sizing: border-box;

    &--stretched {
      max-width: 100%;
    }
  }

  &__sidebar {
    width: var(--layout-sidebar-width);
    flex-shrink: 0;
    box-sizing: border-box;
    padding: var(--spacing-xxl) var(--spacing-ml);
  }
}
</style>
