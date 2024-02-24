<template>
  <div>
    <input class="input" :value="props.text" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  /**
   * The text to display on the input
   */
  text: string;
}>();
</script>

<style lang="postcss">
.input {
  background-color: var(--base--bg-secondary);
  border: 0;
  outline: 0;
  color: var(--base--text);
  padding: var(--spacing-mm) var(--spacing-ml);
  border-radius: var(--radius-ml);
  font-size: inherit;
  font-family: inherit;
}
</style>
