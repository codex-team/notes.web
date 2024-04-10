<template>
  <div :class="[$style['form-section'], `${$style['form-section']}--${size}`]">
    <div :class="[$style['form-section-title'], 'text-ui-footnote']">
      {{ title }}
    </div>
    <div :class="[$style['form-section-body-wrapper'], withBackground ? $style['form-section-body-wrapper--bg'] : '']">
      <slot></slot>
    </div>
    <div :class="[$style['form-section-caption'], 'text-ui-subtle']">
      {{ caption }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { FieldSize } from './FormSection.types';

withDefaults(
  defineProps<{
    /**
     * Form section title
     * Will be displayed as a heading
     */
    title: string;

    /**
     * Additional description of the embedded field
     */
    caption?: string;

    /**
     * The size of the form section
     */
    size?: FieldSize;

    /**
     * True if there is a background in the component body
     */
    withBackground?: boolean;
  }>(),
  {
    caption: '',
    size: 'medium',
    withBackground: true,
  }
);
</script>

<style module>
.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  --h-padding: var(--spacing-m);

  &--small {
    --h-padding: var(--spacing-s);
  }

  &--medium {
    --h-padding: var(--spacing-m);
  }

  &--large {
    --h-padding: var(--spacing-l);
  }

  &-title,
  &-caption {
    padding-top: var(--spacing-xs);
    padding-inline: var(--h-padding);
  }

  &-caption {
    color: var(--base--text-secondary);
  }

  &-body-wrapper {
    border-radius: var(--radius-m);
    &--bg {
      background-color: #0a0a0a;
    }
  }
}
</style>