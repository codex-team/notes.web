<template>
  <div>
    <button :class="[$style.button, `${$style.button}--${size}`, 'text-ui-base-medium']">
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * The size of the button
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * The style of the button
     */
    style?: 'primary' | 'secondary' | 'destructive';

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

  --padding: 0 0;
  --radius: 0;
  --color: var(--base--text-solid-foreground);
  --bg: var(--base--solid);

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

  padding: var(--padding);
  border-radius: var(--radius);
  background-color: var(--bg);
  color: var(--color);
}
</style>
