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
import { defineProps, computed, withDefaults, ref } from 'vue';
import Icon from '../icon/Icon.vue';
import type { AlertOptions } from './Alert.types';
import { ALERT_CONTAINER_STYLES } from './constant';

const el = ref<HTMLElement>();

const props = withDefaults(defineProps<AlertOptions>(), {
  position: ALERT_CONTAINER_STYLES.position,
  message: ALERT_CONTAINER_STYLES.message,
  icon: ALERT_CONTAINER_STYLES.icon,
  type: ALERT_CONTAINER_STYLES.type,
  timeout: ALERT_CONTAINER_STYLES.timeout,
});

/**
 *
 * computed theme
 */
const computedTheme = computed(() => {
  if (props.type === 'success') {
    return 'grass';
  }

  if (props.type === 'error') {
    return 'red';
  }

  if (props.type === 'warning') {
    return 'amber';
  }

  if (props.type === 'info') {
    return 'graphite';
  }

  return undefined;
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
  transform: translateZ(0);
  direction: ltr;
  padding: var(--v-padding) var(--h-padding) var(--v-padding) var(--h-padding);
  border-radius: var(--radius-field);
  color: var(--accent--text-solid-foreground);

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
    background-color: var(--base--solid-secondary);
  }
}
</style>
