<template>
  <div :class="[$style['input'], `${$style.input}--${size}`]">
    <Icon
      v-if="icon"
      :name="icon"
    />
    <input
      v-model="model"
      :class="[$style['input__wrapper'], 'text-ui-base']"
      :disabled="props.disabled"
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineModel } from 'vue';
import { InputSize } from './Input.types';
import Icon from '../icon/Icon.vue';

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

    /**
     * Name of the input icon
     */
    icon?: string;
  }>(),
  {
    value: '',
    size: 'medium',
    disabled: false,
    icon: undefined,
  }
);

const model = defineModel<string>();

onMounted(() => {
  model.value = props.value;
});
</script>

<style module>
.input {
  display: flex;
  border: 0;
  background-color: var(--base--bg-secondary);
  gap: var(--v-padding);
  align-items: center;
  width: 100%;

  &__wrapper {
    flex: 1;
    border: 0;
    outline: 0;
    color: var(--base--text);
    width: inherit;
    font-size: inherit;
    font-family: inherit;
    background-color: inherit;

    &[disabled] {
      color: var(--base--text-secondary);
    }
  }

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

  padding: var(--padding);
  border-radius: var(--radius);
}
</style>
