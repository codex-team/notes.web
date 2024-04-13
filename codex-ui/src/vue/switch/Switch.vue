<template>
  <div
    :class="[$style.switch, $style[`switch-${switchValue}-${disabled ? 'disabled' : 'default'}`]]"
    v-on="disabled === false ? { click: changeValue } : {}"
  >
    <div
      :class="[
        $style[`switch__ellipse`],
        $style[`switch__ellipse-${disabled ? 'disabled' : 'default'}`],
        $style[`switch-${switchValue}`],
      ]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { SwitchOn, Disabled } from './Switch.types.js';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * Value of the switch ('on' or 'off')
     */
    value?: SwitchOn;

    /**
     * State of interaction with the component
     */
    disabled?: Disabled;
  }>(),
  { value: true, disabled: false }
);

const switchValue = ref(props.value);

/**
 *
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
    border-radius: var(--radius-l);
    &-disabled {
      background: var(--accent--text-secondary);
    }
    &-default {
      background: var(--accent--text-solid-foreground);
    }
  }

  /* Style for true value of the switch*/
  &-true {
    margin-left: calc(100% - 18px);
    transition: margin-left 0.2s;

    &-default {
      --bg-color: var(--accent--solid);
      &:hover {
        background-color: var(--base--solid-hover);
      }
    }

    &-disabled {
      --bg-color: var(--accent--bg-secondary);
      cursor: not-allowed;
    }
  }

  /* Style for false value of the switch*/
  &-false {
    margin-left: 0;
    transition: margin-left 0.2s;

    &-default {
      --bg-color: var(--accent--bg-secondary);

      &:hover {
        background-color: var(--accent--bg-secondary-hover);
      }
    }

    &-disabled {
      --bg-color: var(--accent--bg-secondary);
      cursor: not-allowed;
    }
  }
}
</style>
