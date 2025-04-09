<template>
  <div
    :class="[
      $style['page-block'],
      { [$style['page-block--stretched']]: stretched }
    ]"
  >
    <!-- Left Sidebar -->
    <div
      v-if="$slots.left"
      :class="$style['page-block__sidebar']"
    >
      <slot name="left" />
    </div>
    <div
      :class="$style['page-block__sidebar']"
      v-else
    />

    <!-- Center Content -->
    <div
      :class="[
        $style['page-block__content'],
        { [$style['page-block__content--stretched']]: stretched }
      ]"
    >
      <slot />
    </div>

    <!-- Right Sidebar -->
    <div
      v-if="$slots.right"
      :class="$style['page-block__sidebar']"
    >
      <slot name="right" />
    </div>
    <div
      :class="$style['page-block__sidebar']"
      v-else
    />
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

<style module lang="postcss">
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
    flex-grow: 1;
    min-width: 0;
    padding: var(--spacing-xxl) var(--spacing-ml);
    box-sizing: border-box;

    &--stretched {
      max-width: 100%;
      flex: 2;
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
