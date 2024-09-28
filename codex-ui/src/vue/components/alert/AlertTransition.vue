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
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
