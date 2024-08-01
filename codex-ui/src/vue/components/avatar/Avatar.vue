<template>
  <img
    :src="src"
    :alt="`Avatar of ${username}`"
    :class="$style[`avatar--${size}`]"
    referrerpolicy="no-referrer"
  >
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

withDefaults(defineProps<{
  /**
   * Path to the image
   */
  src: string;

  /**
   * Name of the user
   * In future, we can use this to generate initials
   */
  username: string;

  /**
   * Size of the avatar image
   * medium by default
   */
  size: 'medium' | 'small';
}>(),
{
  src: undefined,
  username: undefined,
  size: 'medium',
});

</script>

<style module>
.avatar {
  &--small {
    width: var(--size-icon);
    height: var(--size-icon);
    border-radius: var(--radius-s);
  }

  &--medium {
    width: var(--size-avatar);
    height: var(--size-avatar);
    border-radius: var(--radius-m);
  }
}
</style>
