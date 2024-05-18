<template>
  <input
    v-model="model"
    :class="[$style.input, `${$style.input}--${size}`, 'text-ui-base']"
    :disabled="props.disabled"
  >
</template>

<script setup lang="ts">
import { onMounted, defineModel } from 'vue';
import { InputSize } from './Input.types';

const props = withDefaults(
  defineProps<{
    /**
     * The text to display on the input
     */
    value?: string;

    /**
     * The size of the input
     */
    size?: InputSize;

    /**
     * Whether the input is disabled
     */
    disabled?: boolean;
  }>(),
  {
    value: '',
    size: 'medium',
    disabled: false,
  }
);

const model = defineModel();

onMounted(() => {
  model.value = props.value;
});
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
