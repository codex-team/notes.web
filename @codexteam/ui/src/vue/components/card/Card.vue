<template>
  <div
    :class="[
      $style.card,
      $style['card--' + orientation]
    ]"
  >
    <div
      :class="[
        $style['card__cover'],
        {
          [$style['card__cover--skeleton']]: isCoverLoading,
        },
      ]"
      :style="src ? `background-image: url(${src})` : undefined"
    />

    <div :class="$style['card__body']">
      <div
        v-if="title"
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
    title?: string;

    /**
     * Card variety.
     * Card can be vertically oriented (image, body and footer are positioned in vertical direction)
     * and horizontally oriented (elements are positioned in horizontal direction)
     */
    orientation: CardOrientation;

    /**
     * Card subtitle.
     * Text displayed below (or left to) the title
     */
    subtitle?: string;

    /**
     * Cover image source
     */
    src?: string;

    /**
     * Loading state.
     * When true shows skeleton shimmer on cover
     */
    isCoverLoading?: boolean;
  }>(),
  {
    title: '',
    subtitle: '',
    orientation: 'vertical',
    src: '',
    isCoverLoading: false,
  }
);
</script>

<style module lang="postcss">
.card {
  --card-width: 222px;

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

    .card__cover {
      width: 150px;
      height: 100px;
    }
  }

  &__body {
    flex: 1;
  }

  &__subtitle {
    color: var(--base--text-secondary);
  }

  &--vertical {
    width: var(--card-width);
  }

  &__body {
    flex-grow: 1;
  }

  &__cover {
    flex-shrink: 0;
    width: 100%;
    aspect-ratio: 222/140;
    border-radius: var(--radius-m);
    background-color: var(--base--bg-primary);
    background-size: cover;

    &--skeleton {
      background-color: color-mix(in srgb, var(--base--text-secondary) 10%, transparent);
      background-image: linear-gradient(
        to left,
        color-mix(in srgb, var(--base--text-secondary) 30%, transparent) 0%,
        color-mix(in srgb, var(--base--text-secondary) 10%, transparent) 50%,
        color-mix(in srgb, var(--base--text-secondary) 30%, transparent) 100%
      );
      background-size: 200% 100%;
      animation: card-skeleton-animation 3s infinite linear;
    }
  }

  &__title {
    color: var(--base--text);
  }
}

@keyframes card-skeleton-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
