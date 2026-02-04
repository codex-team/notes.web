<template>
  <button
    :class="[
      $style.button,
      $style[`button--${style}`],
      iconType !== 'none' && $style[`button--icon-${iconType}`],

      'text-ui-base-medium',
    ]"
    :theme-accent="style === 'destructive' ? 'red' : undefined"
  >
    <Icon
      v-if="icon"
      :name="icon"
    />
    <slot />
    <Icon
      v-if="trailingIcon"
      :name="trailingIcon"
    />
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, useSlots } from 'vue';
import Icon from '../icon/Icon.vue';

/**
 * Red theme for destructive styles (auto-included, no manual import required by consumers).
 */
import '@codexteam/ui/styles/themes/red';

const props = withDefaults(
  defineProps<{
    /**
     * Button is primary by default
     * Add the secondary prop to make it secondary
     */
    secondary?: boolean;

    /**
     * Pass this attribue for negative actions
     */
    destructive?: boolean;

    /**
     * Whether the button is disabled
     */
    disabled?: boolean;

    /**
     * Name of the center icon. Uses in case only icon should be displayed
     */
    icon?: string;

    /**
     * Name of the trailing icon. Uses in case icon should be displayed after the text
     */
    trailingIcon?: string;
  }>(),
  {
    secondary: false,
    destructive: false,
    disabled: false,
    icon: undefined,
    trailingIcon: undefined,
  }
);

const slots = useSlots();

/**
 * Button style: primary (default), secondary, destructive, disabled
 */
const style = computed(() => {
  if (props.disabled) {
    return 'disabled';
  }

  if (props.secondary) {
    return 'secondary';
  }

  if (props.destructive) {
    return 'destructive';
  }

  return 'primary';
});

/**
 * Return true if no text was passed via slot
 */
const isTextEmpty = computed(() => {
  if (slots.default) {
    const [firstChild] = slots.default();

    const text = firstChild.children?.toString().trim();

    return text ? text.length === 0 : true;
  }

  return true;
});

/**
 * Icon type: none, leading, trailing, leadingTrailing, standalone
 * Paddings will be adjusted based on this value
 */
const iconType = computed<'none' | 'leading' | 'trailing' | 'leadingTrailing' | 'standalone' >(() => {
  if (isTextEmpty.value && props.icon) {
    return 'standalone';
  }

  if (props.icon && props.trailingIcon) {
    return 'leadingTrailing';
  }

  if (props.icon) {
    return 'leading';
  }

  if (props.trailingIcon) {
    return 'trailing';
  }

  return 'none';
});
</script>

<style module>
.button {
  --padding-left: var(--h-padding);
  --padding-right: var(--h-padding);

  --color: var(--accent--text-solid-foreground);
  --bg: var(--accent--solid);
  --bg-hover: var(--accent--solid-hover);
  --border-color: transparent;

  display: inline-flex;
  align-items: center;
  gap: var(--v-padding);
  border: 0;
  outline: 0;
  font-family: inherit;
  cursor: pointer;
  word-break: keep-all;

  padding: var(--v-padding) var(--padding-right) var(--v-padding) var(--padding-left);
  border-radius: var(--radius-field);
  background-color: var(--bg);
  color: var(--color);
  box-shadow: inset 0 0 0 1px var(--border-color);

  /**
   * Styles
   */
  &--primary {
    --bg: var(--accent--solid);
    --bg-hover: var(--accent--solid-hover);
  }

  &--secondary {
    --bg: var(--base--bg-secondary);
    --bg-hover: var(--base--bg-secondary-hover);
    --border-color: var(--base--border);
    --color: var(--base--text);
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

  &--icon {
    &-leading {
      --padding-left: var(--v-padding)
    }

    &-trailing {
      --padding-right: var(--v-padding)
    }

    &-leadingTrailing,
    &-standalone {
      --padding-left: var(--v-padding);
      --padding-right: var(--v-padding);
    }
  }

  &:hover {
    background-color: var(--bg-hover);
  }
}
</style>
