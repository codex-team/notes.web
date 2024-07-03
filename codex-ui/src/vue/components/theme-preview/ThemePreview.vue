<template>
  <div
    class="theme-preview"
    :theme-base="theme.toLowerCase()"
  />
</template>

<script setup lang="ts">
defineProps<{
  /**
   * Title to be displayed in head of the component
   */
  theme: string;
}>();

</script>

<style lang="postcss">
.theme-row {
  cursor: pointer;

  &:first-of-type {
    border-top-left-radius: var(--radius-field);
    border-top-right-radius: var(--radius-field);
  }

  &:last-of-type {
    border-bottom-left-radius: var(--radius-field);
    border-bottom-right-radius: var(--radius-field);
  }

  &:hover {
    background-color: var(--base--bg-secondary-hover);
  }
}

.theme-preview {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-field);
  background-color: var(--base--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: var(--radius-field);
    background-color: var(--base--solid);
  }
}
</style>
