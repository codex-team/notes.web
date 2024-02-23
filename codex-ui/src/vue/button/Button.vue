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
  border: 1px solid green;
  background-color: blue;
}
</style>
