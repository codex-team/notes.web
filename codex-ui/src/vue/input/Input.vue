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
  padding: 12px 16px;
  border-radius: 12px;
  font-size: inherit;
  font-family: inherit;
}
</style>
