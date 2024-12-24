<template>
  <div class="navbar">
    <slot />
    <div class="navbar__right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-navbar);
  background-color: var(--base--bg-primary);
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: var(--layout-navbar-height);
  border-bottom: 1px solid var(--base--border);
  box-sizing: border-box;

  &__right {
      margin-left: auto;
  }
}
</style>
