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
  position: relative;
  z-index: 1;
}

.alert-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 0;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
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
  transform: translateY(-10px);
  margin: 0;
  padding: 0;
}

/* Move other items smoothly when one is removed */
.alert-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.alert-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}
</style>
