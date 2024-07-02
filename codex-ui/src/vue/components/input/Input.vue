<template>
  <div
    :class="[$style['input'], `${$style.input}--${size}`]"
    @click="focusInput"
  >
    <Icon
      v-if="icon"
      :style="{ color: 'var(--base--text-secondary)' }"
      :name="icon"
    />
    <input
      ref="textInput"
      v-model="model"
      :class="[$style['input__editable-zone'], 'text-ui-base']"
      :disabled="props.disabled"
      :placeholder="placeholder"
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineModel, ref } from 'vue';
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

    /**
     * Text to be displayed in an empty field
     */
    placeholder?: string;
  }>(),
  {
    value: '',
    size: 'medium',
    disabled: false,
    icon: undefined,
    placeholder: '',
  }
);

const model = defineModel<string>();

const textInput = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  if (textInput.value) {
    textInput.value.focus();
  }
};

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
  cursor: text;

  ::placeholder{
    color: var(--base--text-secondary);
  }

  &__editable-zone {
    flex: 1;
    border: 0;
    outline: 0;
    padding: 0;
    color: var(--base--text);
    width: inherit;
    font-size: inherit;
    font-family: inherit;
    background-color: inherit;

    &[disabled] {
      color: var(--base--text-secondary);
    }
  }
  border: 0;
  outline: 0;
  color: var(--base--text);
  font-size: inherit;
  font-family: inherit;
  box-sizing: border-box;

  --padding: 0 0;

  /**
   * Sizes
   */
  &--small {
    --padding: var(--spacing-xs) var(--spacing-ms);
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
