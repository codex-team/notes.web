<template>
  <div
    :class="[
      $style['card-skeleton'],
      $style['card-skeleton--' + orientation]
    ]"
  >
    <div
      :class="$style['card-skeleton__cover']"
    />
    <div :class="$style['card-skeleton__body']">
      <div
        v-if="titleWidth"
        :class="$style['card-skeleton__title']"
      />
      <div
        v-if="subtitleWidth"
        :class="$style['card-skeleton__subtitle']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { CardOrientation } from './Card.types';

withDefaults(
  defineProps<{
    /**
     * Size of the title skeleton line
     * Pass 0 to hide the line
     */
    titleWidth?: number;

    /**
     * Size of the subtitle skeleton line
     * Pass 0 to hide the line
     */
    subtitleWidth?: number;

    /**
     * Card variety.
     * Card can be vertically oriented (image, body and footer are positioned in vertical direction)
     * and horizontally oriented (elements are positioned in horizontal direction)
     */
    orientation: CardOrientation;
  }>(),
  {
    titleWidth: 50,
    subtitleWidth: 100,
    orientation: 'vertical',
  }
);
</script>

<style module lang="postcss">
.card-skeleton {
  --card-width: 222px;

  --skeleton-line-bg: var(--base--text-secondary);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-ml);
  border-radius: var(--radius-m);
  padding: var(--v-padding) var(--h-padding);
  background-color: var(--base--bg-secondary);

  &--horizontal {
    width: 100%;
    flex-direction: row;
    gap: var(--spacing-l);
    align-items: center;
    box-sizing: border-box;

    .card-skeleton__cover {
      width: 150px;
      height: 100px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--spacing-m);
  }

  &__title,
  &__subtitle {
    height: 9px;
    border-radius: var(--radius-m);
  }

  &__title {
    width: v-bind(`${titleWidth}px`);
    margin-top: var(--spacing-s);
  }

  &__subtitle {
    width: v-bind(`${subtitleWidth}px`);
  }

  &--vertical {
    width: var(--card-width);
  }

  &__cover {
    flex-shrink: 0;
    width: 100%;
    aspect-ratio: 222/140;
    border-radius: var(--radius-m);
  }

  &__title,
  &__subtitle,
  &__cover {
    background-color: color-mix(in srgb, var(--skeleton-line-bg) 10%, transparent);
    background-image: linear-gradient(
    to left,
    color-mix(in srgb, var(--skeleton-line-bg) 30%, transparent) 0%,
    color-mix(in srgb, var(--skeleton-line-bg) 10%, transparent) 50%,
    color-mix(in srgb, var(--skeleton-line-bg) 30%, transparent) 100%
  );
    background-size: 200% 100%;
    animation: skeleton-animation 3s infinite linear;
  }
}

@keyframes skeleton-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0
  }
}

</style>
