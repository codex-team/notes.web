<template>
  <img
    :src="src"
    :alt="`Avatar of ${username}`"
    :class="$style.avatar"
    referrerpolicy="no-referrer"
  >
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  /**
   * Path to the image
   */
  src: string;

  /**
   * Name of the user
   * In future, we can use this to generate initials
   */
  username: string;
}>();
</script>

<style module>
.avatar {
  width: var(--size-avatar);
  height: var(--size-avatar);
  border-radius: var(--radius-m);
}
</style>
