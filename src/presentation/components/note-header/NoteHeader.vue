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
  padding: var(--spacing-s) var(--spacing-m);

  &__left {
    color: var(--base--text-secondary);
  }

  &__right {
    display: flex;
    gap: var(--spacing-s);
  }
}
</style>
