<template>
  <div
    v-if="state === 'disabled'"
    :class="[$style.switch, $style[`switch__${switchValue}__disabled`]]"
  >
    <div :class="[$style[`switch__ellipse`], $style[`switch__${switchValue}`]]"></div>
  </div>
  <div
    v-if="state === 'default'"
    :class="[$style.switch, $style[`switch__${switchValue}__default`]]"
    @click="changeValue"
  >
    <div :class="[$style[`switch__ellipse`], $style[`switch__${switchValue}`]]"></div>
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
  padding: var(--padding, 2px);
  gap: 10px;
  border-radius: var(--Radius-radius-l, 16px);

  /* Остальные стили */
}

/* Дополнительные стили для включенного состояния */
.switch__true__default {
  --bg-color: var(--solid, #1c84ff);
}

/* Дополнительные стили для выключенного состояния */
.switch__false__default {
  --bg-color: var(--bg-secondary, #2c2d30);
}

.switch__true__default:hover {
  background-color: var(--solid-hover, #0075ff);
}

.switch__false__default:hover {
  background-color: var(--bg-secondary-hover, #3b3c40);
}

.switch__true__disabled {
  --bg-color: var(--bg-secondary, #2c2d30);
  cursor: not-allowed;
}

.switch__false__disabled {
  --bg-color: var(--bg-secondary, #2c2d30);
  cursor: not-allowed;
}

/* Элемент-эллипс */
.switch__ellipse {
  width: 18px;
  height: 18px;
  background: var(--solid, #f5f5f5);
  border-radius: var(--Radius-radius-l, 16px);
}

/* Изменения для включенного/выключенного состояния */
.switch__true {
  margin-left: calc(100% - 18px);
  transition: margin-left 0.2s;
  /* Дополнительные стили */
}
.switch__false {
  margin-left: 0;
  transition: margin-left 0.2s;

  /* Дополнительные стили */
}

/* Стили фона, зависящие от состояния */
.switch {
  background-color: var(--bg-color);
  transition: background-color 0.2s;
}
</style>
