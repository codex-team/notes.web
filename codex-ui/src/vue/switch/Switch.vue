<template>
  <div
    :class="[$style.switch, $style[`switch__${switchValue}__${state}`]]"
    v-on="state === 'default' ? { click: changeValue } : {}"
  >
    <div
      :class="[$style[`switch__ellipse`], $style[`switch__ellipse__${state}`], $style[`switch__${switchValue}`]]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { SwitchOn, SwitchState } from './Switch.types.js';
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
    state?: SwitchState;
  }>(),
  { value: true, state: 'default' }
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
}

.switch__true__default {
  --bg-color: var(--accent--solid);
}

.switch__false__default {
  --bg-color: var(--accent--bg-secondary);
}

.switch__true__default:hover {
  background-color: var(--base--solid-hover);
}

.switch__false__default:hover {
  background-color: var(--accent--bg-secondary-hover);
}

.switch__true__disabled {
  --bg-color: var(--accent--bg-secondary);
  cursor: not-allowed;
}

.switch__false__disabled {
  --bg-color: var(--accent--bg-secondary);
  cursor: not-allowed;
}

.switch__ellipse {
  width: 18px;
  height: 18px;
  border-radius: var(--radius-l);
  &__disabled {
    background: var(--accent--text-secondary);
  }
  &__default {
    background: var(--accent--text-solid-foreground);
  }
}

.switch__true {
  margin-left: calc(100% - 18px);
  transition: margin-left 0.2s;
  /* Дополнительные стили */
}

.switch__false {
  margin-left: 0;
  transition: margin-left 0.2s;
}
</style>
