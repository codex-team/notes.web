<template>
  <div
    ref="el"
    :class="[
      $style.alert,
      $style['alert--' + props.type]
    ]"
    :theme-base="computedTheme"
  >
    <Icon
      v-show="icon"
      :name="icon"
    />
    <div>{{ props.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import Icon from '../icon/Icon.vue';
import type { AlertOptions } from './Alert.types';

const el = ref<HTMLElement>();

const props = withDefaults(defineProps<AlertOptions>(), {
  id: `alert-'${Math.random()}`,
  position: 'bottom-center',
  message: '',
  icon: '',
  type: 'default',
  timeout: 5000,
});

/**
 * Various alert theme type
 */
export type AlertTheme = 'grass' | 'red' | 'amber' | 'graphite' | undefined;

/**
 *
 * computed theme
 */
const computedTheme = computed((): AlertTheme => {
  switch (props.type) {
    case 'success':
      return 'grass';

    case 'error':
      return 'red';

    case 'warning':
      return 'amber';

    case 'info':
      return 'graphite';

    default:
      return undefined;
  }
});
</script>

<style module lang="postcss">
.alert {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: var(--v-padding);
  border: 0;
  margin-block-start: 0.4rem;
  outline: 0;
  font-family: inherit;
  pointer-events: auto;
  background-color: var(--base-text);
  overflow: hidden;
  word-break: keep-all;
  direction: ltr;
  padding: var(--v-padding) var(--h-padding) var(--v-padding) var(--h-padding);
  border-radius: var(--radius-field);
  color: var(--base--text-solid-foreground);
  overflow-wrap: anywhere;

  &--success {
    background-color: var(--base--solid);
  }

  &--error {
    background-color: var(--base--solid);
  }

  &--warning {
    background-color: var(--base--solid);
  }

  &--info {
    background-color: var(--base--solid);
  }

  &--default {
    color: var(--base--text);
    background-color: var(--base--bg-secondary);
  }
}

</style>
