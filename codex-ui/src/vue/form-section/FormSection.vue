<template>
  <div :class="[$style['field'], `${$style['field']}--${size}`]">
    <div :class="[$style['field-title'], 'text-ui-footnote']">
      {{ title }}
    </div>
    <div :class="$style['field-field']">
      <slot></slot>
    </div>
    <div :class="[$style['field-caption'], 'text-ui-subtle']">
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
  }>(),
  {
    caption: '',
    size: 'medium',
  }
);
</script>

<style module>
.field {
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
}
</style>