<template>
  <div :class="$style['popup']">
    <div :class="$style['container']">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * If true, a button to close the popup appears
     */
    hasCloseButton?: boolean;
  }>(),
  {
    hasCloseButton: true,
  }
);
</script>

<style module>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  gap: var(--spacing-ms);
  background-color: rgba(0, 0, 0, 0.49);
  z-index: 100;
}

.container {
  top: 50%;
  left: 50%;
  position: absolute;
  gap: var(--spacing-ml);
  padding: var(--spacing-l);
  border-radius: var(--radius-ml);
  border-color: var(--base--border);
  border-width: var(--delimiter-height);
  background-color: var(--base--bg-primary);
}
</style>
