<template>
  <div
    class="checkbox"
    :class="[
      isChecked && 'checkbox--checked',
      props.disabled && 'checkbox--disabled',
      noHover && 'no-hover',
    ]"
    @click="onClick"
    @mouseleave="onMouseLeave"
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
const noHover = ref(false);

const onClick = () => {
  if (!props.disabled) {
    isChecked.value = !isChecked.value;
    emit('update:checked', isChecked.value);
    noHover.value = true;
  }
};

const onMouseLeave = () => {
  noHover.value = false;
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-m);
  width: var(--size-icon);
  height: var(--size-icon);
  cursor: pointer;

  /* Базовые стили иконки */
  .codex-icon {
    width: var(--checkbox-icon-width);
    height: var(--checkbox-icon-height);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  /* unchecked */
  & {
    background-color: var(--accent--bg-secondary);

    /* Hover unchecked */
    &:not(.checkbox--disabled):not(.no-hover):hover {
      background-color: var(--accent--bg-secondary-hover);

      .codex-icon {
        opacity: 1;
        color: var(--accent--text-secondary);
      }
    }
  }

  /* checked */
  &.checkbox--checked {
    background-color: var(--accent--solid);

    .codex-icon {
      opacity: 1;
      color: var(--accent--text-solid-foreground);
    }

    /* Hover checked */
    &:not(.checkbox--disabled):not(.no-hover):hover {
      background-color: var(--accent--solid-hover);

      .codex-icon {
        color: var(--accent--text-solid-foreground);
      }
    }
  }

  /* disabled */
  &.checkbox--disabled {
    cursor: not-allowed;

    /* Disabled unchecked */
    &.checkbox--unchecked {
      background-color: var(--accent--bg-secondary);

      .codex-icon {
        opacity: 0;
      }
    }

    /* Disabled checked */
    &.checkbox--checked {
      background-color: var(--accent--bg-secondary);

      .codex-icon {
        opacity: 1;
        color: var(--accent--text-secondary);
      }
    }
  }
}
</style>
