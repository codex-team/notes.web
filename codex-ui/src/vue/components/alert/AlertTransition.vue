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
  transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
}
</style>
