<template>
  <div class="header">
    <Heading
      :level="1"
    >
      <slot />
    </Heading>
    <div
      v-if="$slots.description"
      class="header__description text-ui-large"
    >
      <slot name="description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heading } from '@codexteam/ui/vue';
</script>

<style scoped lang="postcss">
.header {
  margin: 0 var(--h-padding);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);

  &__description {
    color: var(--base--text-secondary);
  }
}
</style>
