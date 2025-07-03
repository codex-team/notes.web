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
/* Enter/Leave transitions */
.alert-enter-active {
  transition: all 0.3s ease-out;
}

.alert-leave-active {
  transition: all 0.4s ease-in;
  position: absolute;
  width: 100%;
}

.alert-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.alert-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.alert-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Move other items smoothly when one is removed */
.alert-move {
  transition: transform 0.4s ease;
}

.alert-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}
</style>
