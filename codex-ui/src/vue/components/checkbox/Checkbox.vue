<template>
  <div
    class="checkbox"
    :class="[
      isChecked && 'checkbox--checked',
      props.disabled && 'checkbox--disabled',
    ]"
    @click="onClick"
  >
    <Icon name="Check" />
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import { ref, defineProps, defineEmits, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    checked: boolean;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
    label: undefined,
  }
);

const emit = defineEmits(['update:checked']);
const isChecked = ref(props.checked);

const onClick = () => {
  if (!props.disabled) {
    isChecked.value = !isChecked.value;
    emit('update:checked', isChecked.value);
  }
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius-m);
  width: var(--size-icon);
  height: var(--size-icon);
  background-color: var(--accent--bg-secondary);
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &--checked {
    background-color: var(--accent--solid);
  }

  &:not(&--disabled):hover {
    background-color: var(--accent--solid-hover);
  }

  &--disabled {
    background-color: var(--accent--bg-secondary);
    cursor: not-allowed;
  }

  & .codex-icon {
    width: var(--checkbox-icon-width);
    height: var(--checkbox-icon-height);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &--checked .codex-icon {
    opacity: 1;
  }

  &:not(&--disabled):hover .codex-icon {
    opacity: 1;
    color: var(--accent--text-secondary);
  }
}
</style>
