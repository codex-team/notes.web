<template>
  <transition-group
    tag="div"
    name="fade"
    @leave="leave"
  >
    <slot />
  </transition-group>
</template>

<script setup lang="ts">

const leave = (el: unknown) => {
  if (el instanceof HTMLElement) {
    el.style.left = el.offsetLeft + 'px';
    el.style.top = el.offsetTop + 'px';
    el.style.width = getComputedStyle(el).width;
    el.style.position = 'absolute';
  }
};

</script>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
