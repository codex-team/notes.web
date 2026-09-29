<template>
  <div :class="$style['message']">
    <div
      :class="$style['message__card']"
      data-dimensions="large"
    >
      <div
        v-if="$slots.picture"
        :class="$style['message__picture']"
      >
        <slot name="picture" />
      </div>
      <Heading :level="2">
        {{ title }}
      </Heading>
      <div
        v-if="text"
        :class="[$style['message__text'], 'text-ui-base']"
      >
        {{ text }}
      </div>
      <div
        v-if="$slots.default"
        :class="$style['message__actions']"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heading } from '@codexteam/ui/vue';

defineProps<{
  /**
   * Main message
   */
  title: string;

  /**
   * Explanation below the title
   */
  text?: string;
}>();
</script>

<style module lang="postcss">
.message {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxl) var(--spacing-ml);

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-m);
    max-width: 420px;
    text-align: center;
    margin-bottom: 10vh;
  }

  &__picture {
    margin-bottom: var(--spacing-s);
    color: var(--base--text-secondary);
  }

  &__text {
    color: var(--base--text-secondary);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-s);
    margin-top: var(--spacing-m);
  }
}
</style>
