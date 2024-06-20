<template>
  <div :class="[$style['form-section'], `${$style['form-section']}--${size}`]">
    <div :class="[$style['form-section-title'], 'text-ui-footnote']">
      {{ title }}
    </div>
    <div
      :class="[
        $style['form-section-body-wrapper'],
        withBackground ? $style['form-section-body-wrapper--with-background'] : '',
      ]"
    >
      <slot />
    </div>
    <div :class="[$style['form-section-caption'], 'text-ui-subtle']">
      {{ caption }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { FieldSize } from './Section.types';

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
    &--with-background {
      padding-block: var(--v-padding);
      border-radius: var(--radius-m);
      background-color: var(--base--bg-secondary);
    }
  }
}
</style>
