<template>
  <component
   :is="`h${props.level}`"
   :class="$style.heading"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  /**
   * Heading level. From 1 to 6
   */
  level: number;
}>();
</script>

<style module>
@import '../../styles/mixins/typography.pcss';

.heading {
  @apply --text-heading-1;
}
</style>
