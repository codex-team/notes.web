<template>
  <div>
    <input
      :class="[$style.input, `${$style.input}--${size}`, 'text-ui-base']"
      :value="props.text"
      :disabled="props.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * The text to display on the input
     */
    text: string;

    /**
     * The size of the input
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Whether the input is disabled
     */
    disabled?: boolean;
  }>(),
  {
    size: 'medium',
    disabled: false,
  }
);
</script>

<style lang="postcss" module>
.input {
  background-color: var(--base--bg-secondary);
  border: 0;
  outline: 0;
  color: var(--base--text);
  font-size: inherit;
  font-family: inherit;

  --padding: 0 0;

  /**
   * Sizes
   */
  &--small {
    --padding: var(--spacing-xxs) var(--spacing-s);
    --radius: var(--radius-m);
  }

  &--medium {
    --padding: var(--spacing-s) var(--spacing-m);
    --radius: var(--radius-m);
  }

  &--large {
    --padding: var(--spacing-m) var(--spacing-l);
    --radius: var(--radius-ml);
  }

  &[disabled] {
    color: var(--base--text-secondary);
  }

  padding: var(--padding);
  border-radius: var(--radius);
}
</style>
