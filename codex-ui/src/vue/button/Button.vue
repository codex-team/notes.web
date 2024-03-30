<template>
  <button
    :class="[$style.button, `${$style.button}--${size}`, `${$style.button}--${style}`, 'text-ui-base-medium']"
    :theme-accent="style === 'destructive' ? 'red' : undefined"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { ButtonSize, ButtonStyle } from './Button.typings'

const props = withDefaults(
  defineProps<{
    /**
     * The size of the button
     */
    size?: ButtonSize;

    /**
     * The style of the button
     */
    style?: ButtonStyle;

    /**
     * Whether the button is disabled
     */
    disabled?: boolean;
  }>(),
  {
    size: 'medium',
    style: 'primary',
    disabled: false,
  }
);

/**
 * Button style: primary (default), secondary, destructive, disabled
 */
const style = computed(() => {
  if (props.disabled) {
    return 'disabled';
  }

  return props.style;
});
</script>

<style lang="postcss" module>
.button {
  border: 0;
  outline: 0;
  font-family: inherit;
  cursor: pointer;

  --padding: 0 0;
  --radius: 0;
  --color: var(--base--text-solid-foreground);
  --bg: var(--base--solid);
  --bg-hover: var(--base--solid-hover);
  --border-color: transparent;

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

  /**
   * Styles
   */
  &--primary {
    --bg: var(--base--solid);
    --bg-hover: var(--base--solid-hover);
  }

  &--secondary {
    --bg: var(--base--bg-secondary);
    --bg-hover: var(--base--bg-secondary-hover);
    --border-color: var(--base--border);
  }

  &--disabled {
    --bg: var(--base--bg-secondary);
    --bg-hover: var(--base--bg-secondary);
    --color: var(--base--text-secondary);
    cursor: not-allowed;
  }

  &--destructive {
    --bg: var(--accent--solid);
    --bg-hover: var(--accent--solid-hover);
  }

  padding: var(--padding);
  border-radius: var(--radius);
  background-color: var(--bg);
  color: var(--color);
  box-shadow: inset 0 0 0 1px var(--border-color);

  &:hover {
    background-color: var(--bg-hover);
  }
}
</style>
