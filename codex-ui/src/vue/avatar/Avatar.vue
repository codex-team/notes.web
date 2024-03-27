<template>
  <img
    :src="props.src"
    alt="avatar"
    :class="$style.avatar"
    referrerpolicy="no-referrer"
  >
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  /**
   * Path to the image
   */
  src: string;
}>();
</script>

<style module>
.avatar {
  width: var(--size-avatar);
  height: var(--size-avatar);
  border-radius: var(--radius-m);
}
</style>
