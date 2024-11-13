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

/**
 * Component props with default values
 *
 * @property {string | undefined} label - Optional label for the checkbox
 * @property {boolean} checked - Initial checked state of the checkbox
 * @property {boolean | undefined} disabled - Whether the checkbox is disabled
 */
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

/**
 * Define events that the component can emit
 */
const emit = defineEmits(['update:checked']);

/**
 * Reactive variable to keep track of checkbox checked state
 *
 * @type {import('vue').Ref<boolean>}
 */
const isChecked = ref(props.checked);

/**
 * Reactive variable to manage hover state
 *
 * @type {import('vue').Ref<boolean>}
 */
const noHover = ref(false);

/**
 * Function that toggles the checked state when the checkbox is clicked
 */
const onClick = () => {
  if (!props.disabled) {
    isChecked.value = !isChecked.value;
    emit('update:checked', isChecked.value);
    noHover.value = true;
  }
};

/**
 * Function to reset hover state when the mouse leaves the checkbox
 */
const onMouseLeave = () => {
  noHover.value = false;
};
</script>

<style scoped>
/**
 * Base styles for the checkbox container
 */
.checkbox {
  --checkbox-bg-color: var(--accent--bg-secondary);
  --icon-color: var(--accent--text-solid-foreground);

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-m);
  width: var(--size-icon);
  height: var(--size-icon);
  background-color: var(--checkbox-bg-color);
  cursor: pointer;
  user-select: none;

  /**
   * Base icon styles
   */
  .codex-icon {
    width: var(--checkbox-icon-width);
    height: var(--checkbox-icon-height);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--icon-color);
    opacity: 0;
  }

  /**
   * Styles for hover state when unchecked
   */
  &:not(.checkbox--disabled):not(.no-hover):hover {
    --checkbox-bg-color: var(--accent--bg-secondary-hover);
    --icon-color: var(--accent--text-secondary);

    .codex-icon {
      opacity: 1;
    }
  }

  /**
   * Styles for checked state
   */
  &.checkbox--checked {
    --checkbox-bg-color: var(--accent--solid);
    --icon-color: var(--accent--text-solid-foreground);

    .codex-icon {
      opacity: 1;
    }

    /**
     * Styles for hover state when checked
     */
    &:not(.checkbox--disabled):not(.no-hover):hover {
      --checkbox-bg-color: var(--accent--solid-hover);
      --icon-color: var(--accent--text-solid-foreground);
    }
  }

  /**
   * Styles for disabled state
   */
  &.checkbox--disabled {
    cursor: not-allowed;

    /**
     * Styles for unchecked disabled state
     */
    &.checkbox--unchecked {
      --checkbox-bg-color: var(--accent--bg-secondary);

      .codex-icon {
        opacity: 0;
      }
    }

    /**
     * Styles for checked disabled state
     */
    &.checkbox--checked {
      --checkbox-bg-color: var(--accent--bg-secondary);
      --icon-color: var(--accent--text-secondary);

      .codex-icon {
        opacity: 1;
      }
    }
  }
}
</style>
