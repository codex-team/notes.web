<template>
  <div :class="[$style.card, orientation === 'horizontal' ? $style['card--horizontal'] : '']">
    <div :class="$style['card__cover']"></div>
    <div :class="$style['card__footer']">
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

/**
 * NoteListItem props, receive Note
 *
 * @param {string} title - Note title
 * @param {string} updatedAt - Last updated date of note
 * @param {string} buttonText - Button text
 * @param orientation - Orientation of card
 */
defineProps<{
  title: string;
  updatedAt: string;
  orientation: CardOrientation;
}>();
</script>

<style module lang="postcss">
.card {
  display: flex;
  flex-direction: column;
  width: 222px;
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
    height: 140px;
    border-radius: var(--radius-m);
    background-color: var(--base--bg-primary);
  }

  &__footer {
    width: 100%;
  }
}
</style>
