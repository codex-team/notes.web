<template>
  <div>
    <button :class="$style.button">
      {{ text || 'No text passed' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  /**
   * The text to display on the button
   */
  text: string;
}>();
</script>

<style lang="postcss" module>
.button {
  background-color: var(--base--solid);
  border: 0;
  outline: 0;
  color: var(--base--text-solid-foreground);
  padding: var(--spacing-s) var(--spacing-mm);
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-m);
}
</style>
