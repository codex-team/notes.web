<template>
  <div :class="$style['popup']" />
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
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.49);
  z-index: 100;
  &__container {

  }
}
</style>
