<template>
  <transition-group
    tag="div"
    name="fade"
  >
    <slot />
  </transition-group>
</template>

<style lang="postcss">

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.fade-leave-active {
  position: absolute;
}
</style>
