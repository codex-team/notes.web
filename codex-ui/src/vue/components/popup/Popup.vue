<template>
  <div :class="$style['popup']">
    <div :class="$style['container']">
      <slot />
    </div>
    <div :class="$style['popup__icon']">
      <Icon name="Cross" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';

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
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  gap: var(--spacing-ms);
  background-color: rgba(0, 0, 0, 0.49);

  &__icon {
  position: absolute;
  top: 50%;
  color: var(--base--text-secondary);
  right: calc(50% + var(--spacing-very-x));
  transform: translateY(-50%);
  padding: var(--spacing-very-x);
  border: var(--delimiter-height) solid;
  border-radius: var(--radius-l);
}
}

.container {
  top: 50%;
  left: 50%;
  position: absolute;
  gap: var(--spacing-ml);
  padding: var(--spacing-l);
  border: var(--delimiter-height) solid var(--base--border);
  border-radius: var(--radius-ml);
  background-color: var(--base--bg-primary);
}
</style>
