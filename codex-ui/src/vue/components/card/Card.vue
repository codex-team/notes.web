<template>
  <div :class="[$style.card, orientation === 'horizontal' ? $style['card--horizontal'] : '']">
    <div :class="$style['card__cover']"></div>

    <div :class="$style['card__body']">
      <Heading :level="3">{{ title }}</Heading>

      <div :class="[$style['card__updatedAt'], 'text-ui-subtle']">{{ updatedAt }}</div>
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Heading from '../heading/Heading.vue';
import type { CardOrientation } from './Card.types';

defineProps<{
  /**
   * Card title
   */
  title: string;

  /**
   * Update date
   */
  updatedAt: string;

  /**
   * Card orientation
   */
  orientation: CardOrientation;
}>();
</script>

<style module lang="postcss">
.card {
  --card-width: 222px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-l);
  border-radius: var(--radius-m);
  padding: var(--spacing-m);
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
}
</style>
