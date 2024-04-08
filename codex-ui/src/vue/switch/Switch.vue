<template>
  <div :class="[$style.switch, $style[`switch__${props.value}__${state}`]]">
    <div :class="$style['switch__ellipse']"></div>
  </div>
</template>

<script lang="ts" setup>
import { SwitchValues, SwitchStates } from './Switch.types.js';

const props = defineProps<{
  /**
   * Value of the switch ('on' or 'off')
   */
  value: SwitchValues;

  /**
   * State of interaction with the component
   */
  state: SwitchStates;
}>();
</script>

<style module lang="postcss">
.switch {
  cursor: pointer;
  display: flex;
  width: 32px;
  padding: var(--padding, 2px);
  flex-direction: column;
  gap: 10px;
  border-radius: var(--Radius-radius-l, 16px);

  --padding: var(--spacing-very-x);
  --bg-color: var(--solid, #1c84ff);
  --align: flex-start;

  &__ellipse {
    width: 18px;
    height: 18px;
    background: var(--solid, #f5f5f5);
    border-radius: var(--Radius-radius-l, 16px);
  }

  /**
  * States
  */
  &__on {
    --align: flex-end;

    /**
    * Styles
    */
    &__default {
      --bg-color: var(--solid, #1c84ff);
    }
    &__disabled {
      --bg-color: var(--bg-hover, #2c2d30);
      cursor: not-allowed;
    }
    &__hover {
      --bg-color: var(--solid-hover, #0075ff);
    }
  }
  &__off {
    --align: flex-start;

    /**
    * Styles
    */
    &__default {
      --bg-color: var(--bg-secondary, #2c2d30);
    }
    &__disabled {
      --bg-color: var(--bg-secondary, #2c2d30);
      cursor: not-allowed;
    }
    &__hover {
      --bg-color: var(--bg-secondary-hover, #3b3c40);
    }
  }

  background-color: var(--bg-color);
  align-items: var(--align);
}
</style>
