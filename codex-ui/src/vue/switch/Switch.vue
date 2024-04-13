<template>
  <div
    :class="[$style.switch, disabled ? $style[`switch--disabled`] : '', switchValue ? $style[`switch--on`] : '']"
    v-on="disabled === false ? { click: changeValue } : {}"
  >
    <div :class="[$style[`switch__ellipse`], $style[`switch__ellipse--${switchValue}`]]"></div>
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
  --bg-color: var(--accent--bg-secondary);
  transition: background-color 0.2s;
  &:hover {
    --bg-color: var(--base--bg-secondary-hover);
  }

  &__ellipse {
    width: 18px;
    height: 18px;
    border-radius: var(--radius-l);
    background: var(--accent--text-solid-foreground);
    margin-left: 0px;
    transition: margin-left 0.2s;
  }

  /* Style for true value of the switch*/
  &--on {
    --bg-color: var(--accent--solid);
    transition: margin-left 0.2s;

    &:hover {
      --bg-color: var(--base--solid-hover);
    }

    & .switch__ellipse {
      --bg-color: var(--accent--solid);
      margin-left: calc(100% - 18px);
    }
  }

  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
    --bg-color: var(--base--bg-secondary);

    & .switch__disabled {
      background: var(--accent--text-secondary);
    }
  }
}
</style>
