<template>
  <div class="playground-page-header">
    <Heading
      :level="1"
      class="playground-page-header__title"
    >
      <slot />
    </Heading>
    <div
      v-if="$slots.description"
      class="playground-page-header__description text-ui-large"
    >
      <slot name="description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heading } from '../../src/vue';

defineProps({
  level: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped>
.playground-page-header {
  margin: 1.5rem 0 2rem;
  max-width: 700px;

  &__title {
    margin-bottom: 1rem;
  }

  &__description {
    color: var(--base--text-secondary);
    line-height: 1.5;
  }
}
</style>
