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

<script setup lang="ts">
</script>
<style module lang="postcss">
.note-header {
  width: 100%;
  display: flex;
  align-items: center;
  opacity: var(--opacity);
  transition: opacity 100ms;
  justify-content: space-between;
  gap: var(--spacing-s);
  padding: var(--spacing-s) var(--spacing-m);
  position: sticky;
  top: var(--layout-navbar-height);
  background-color: var(--base--bg-primary);
  z-index: var(--z-note-header);

  &__left {
    flex: 1 1 0;
    min-width: 0;
    color: var(--base--text-secondary);

    @media (max-width: 768px) {
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  &__right {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--spacing-s);
    align-items: center;
  }
}
</style>
