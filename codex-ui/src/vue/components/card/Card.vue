<template>
  <div :class="[$style.card, orientation === 'horizontal' ? $style['card--horizontal'] : '']">
    <div :class="$style['card__cover']" />

    <div :class="$style['card__body']">
      <div
        :class="['text-ui-base-bold', 'line-clamp-1 ', $style['card__title']]"
        :title="title"
      >
        {{ title }}
      </div>

      <div :class="[$style['card__subtitle'], 'text-ui-subtle']">
        {{ subtitle }}
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { CardOrientation } from './Card.types';

withDefaults(
  defineProps<{
    /**
     * Card title
     */
    title: string;

    /**
     * Card subtitle.
     * Text displayed below (or left to) the title
     */
    subtitle?: string;

    /**
     * Card variety.
     * Card can be vertically oriented (image, body and footer are positioned in vertical direction)
     * and horizontally oriented (elements are positioned in horizontal direction)
     */
    orientation: CardOrientation;
  }>(),
  {
    subtitle: '',
    orientation: 'vertical',
  }
);
</script>

<style module lang="postcss">
.card {
  --card-width: 222px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-l);
  border-radius: var(--radius-m);
  padding: var(--spacing-ml);
  background-color: var(--base--bg-secondary);

  &--horizontal {
    width: 100%;
    flex-direction: row;
    gap: var(--spacing-l);
    align-items: center;

    .card__cover {
      width: 150px;
      height: 100px;
    }
  }

  &__cover {
    width: 100%;
    aspect-ratio: 222/140;
    border-radius: var(--radius-m);
    background-color: var(--base--bg-primary);
  }

  &__body {
    width: 100%;
  }

  &__title {
    color: var(--base--text);
  }
}
</style>
