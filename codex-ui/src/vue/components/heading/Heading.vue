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
<style module lang="postcss">
@import '@/styles/typography.pcss';

.heading {
  color: var(--base--text);
}

h1.heading {
  @apply --text-h1;
}

h2.heading {
  @apply --text-h2;
}

h3.heading {
  @apply --text-h3;
}
</style>
