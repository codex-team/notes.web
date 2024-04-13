<template>
  <div
    :class="[
      $style.switch,
      $style[`switch--${switchValue}`],
      disabled ? $style[`switch--${switchValue}--disabled`] : '',
    ]"
    v-on="disabled === false ? { click: changeValue } : {}"
  >
    <div
      :class="[$style[`switch__ellipse${disabled ? '--disabled' : ''}`], $style[`switch__ellipse--${switchValue}`]]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * Value of the switch ('on' or 'off')
     */
    value?: boolean;

    /**
     * State of interaction with the component
     */
    disabled?: boolean;
  }>(),
  { value: true, disabled: false }
);

const switchValue = defineModel({ default: true });

switchValue.value = props.value;

/**
 * Function for changing value of the switch on click
 */
function changeValue() {
  switchValue.value = !switchValue.value;
}
</script>

<style module lang="postcss">
.switch {
  cursor: pointer;
  width: 32px;
  gap: var(--spacing-ms);
  padding: var(--spacing-very-x);
  border-radius: var(--radius-l);
  background-color: var(--bg-color);
  transition: background-color 0.2s;

  &__ellipse {
    width: 18px;
    height: 18px;
    transition: background 2s;
    border-radius: var(--radius-l);
    background: var(--accent--text-solid-foreground);

    &--true {
      margin-left: calc(100% - 18px);
      transition: margin-left 0.2s;
    }

    &--false {
      margin-left: 0;
      transition: margin-left 0.2s;
    }

    &--disabled {
      width: 18px;
      height: 18px;
      border-radius: var(--radius-l);
      background: var(--accent--text-secondary);
    }
  }

  /* Style for true value of the switch*/
  &--true {
    --bg-color: var(--accent--solid);

    &:hover {
      --bg-color: var(--base--solid-hover);
    }

    &--disabled {
      --bg-color: var(--accent--bg-secondary);
      cursor: not-allowed;
    }
  }

  /* Style for false value of the switch*/
  &--false {
    --bg-color: var(--accent--bg-secondary);

    &:hover {
      --bg-color: var(--accent--bg-secondary-hover);
    }

    &--disabled {
      --bg-color: var(--accent--bg-secondary);
      cursor: not-allowed;
    }
  }
}
</style>
