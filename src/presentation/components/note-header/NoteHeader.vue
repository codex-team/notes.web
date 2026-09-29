<template>
  <div
    :class="$style['note-header']"
  >
    <div :class="$style['note-header__left']">
      <slot name="left" />
    </div>
    <div :class="$style['note-header__right']">
      <slot name="right" />
    </div>
  </div>
</template>

<style module lang="postcss">
.note-header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-l);
  min-height: 52px;
  padding: var(--spacing-s) var(--spacing-l);
  position: sticky;
  top: var(--layout-navbar-height);
  background-color: var(--base--bg-primary);
  z-index: var(--z-note-header);

  &__left {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
    min-width: 0;
    color: var(--base--text-secondary);
  }

  &__right {
    display: flex;
    flex-shrink: 0;
    gap: var(--spacing-s);
    align-items: center;
  }
}
</style>
