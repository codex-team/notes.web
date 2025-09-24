<template>
  <transition-group
    tag="div"
    name="alert"
    class="alert-container"
  >
    <slot />
  </transition-group>
</template>

<script setup lang="ts">
// No script logic needed for basic transitions
</script>

<style lang="postcss">
/* Enter animation */
.alert-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: center bottom;
}

.alert-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: center bottom;
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  max-height: 0;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.alert-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  max-height: 200px;
}

/* Final state for leave */
.alert-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  max-height: 0;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.alert-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  max-height: 200px;
}

/* Move other items smoothly when one is removed */
.alert-move {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.alert-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  min-height: 0;
}
</style>
