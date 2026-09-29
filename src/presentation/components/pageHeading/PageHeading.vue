<template>
  <div class="header">
    <div class="header__text">
      <Heading :level="1">
        <slot />
      </Heading>
      <div
        v-if="$slots.description"
        class="header__description text-ui-base"
      >
        <slot name="description" />
      </div>
    </div>
    <div
      v-if="$slots.actions"
      class="header__actions"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heading } from '@codexteam/ui/vue';
</script>

<style scoped lang="postcss">
.header {
  padding: 0 var(--h-padding);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--spacing-l);

  &__text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    min-width: 0;
  }

  &__description {
    color: var(--base--text-secondary);

    a {
      color: var(--base--text);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__actions {
    display: flex;
    gap: var(--spacing-s);
    flex-shrink: 0;
  }
}
</style>
