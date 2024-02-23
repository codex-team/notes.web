<template>
  <div>
    <input
      :class="$style.input"
      :value="props.text"
    />
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

<style lang="postcss" module>
.input {
  background-color: red;
}
</style>
