<template>
  <input
    v-model="model"
    :class="[$style.input, 'text-ui-base']"
    :disabled="props.disabled"
  >
</template>

<script setup lang="ts">
import { onMounted, defineModel } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * The text to display on the input
     */
    value?: string;

    /**
     * Whether the input is disabled
     */
    disabled?: boolean;
  }>(),
  {
    value: '',
    disabled: false,
  }
);

const model = defineModel<string>();

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
  box-sizing: border-box;

  --padding: 0 0;

  &[disabled] {
    color: var(--base--text-secondary);
  }

  padding: var(--v-padding) var(--h-padding);
  border-radius: var(--radius-field);
}
</style>
