<template>
  <div
    ref="el"
    :class="[
      $style.alert,
      $style['alert--' + computedStyle]
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
import type { AlertOptions, AlertType } from './core/types';
import { ALERT_CONTAINER_STYLES } from './core/constant';

const el = ref<HTMLElement>();

const props = withDefaults(defineProps<AlertOptions>(), {
  id: ALERT_CONTAINER_STYLES.id,
  position: ALERT_CONTAINER_STYLES.position,
  message: ALERT_CONTAINER_STYLES.message,
  icon: ALERT_CONTAINER_STYLES.icon,
  type: ALERT_CONTAINER_STYLES.type,
  timeout: ALERT_CONTAINER_STYLES.timeout,
});

/**
 * computed style
 */
const computedStyle = computed<AlertType | null>(() => {
  if (props.type === 'success') {
    return 'success';
  }

  if (props.type === 'error') {
    return 'error';
  }

  if (props.type === 'warning') {
    return 'warning';
  }

  if (props.type === 'info') {
    return 'info';
  }

  if (props.type === 'default') {
    return 'default';
  }

  return null;
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
  --padding-left: var(--h-padding);
  --padding-right: var(--h-padding);
  --color: var(--accent--text-solid-foreground);
  --bg: var(--base-text);

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
  background-color: var(--bg);
  overflow: hidden;
  word-break: keep-all;
  transform: translateZ(0);
  direction: ltr;
  padding: var(--v-padding) var(--padding-right) var(--v-padding) var(--padding-left);
  border-radius: var(--radius-field);
  box-shadow: inset 0 0 0 1px var(--border-color);
  color: var(--color);

  &--success {
    --bg: var(--base--solid);
  }

  &--error {
    --bg: var(--base--solid);
  }

  &--warning {
    --bg: var(--base--solid);
  }

  &--info {
    --bg: var(--base--solid);
  }

  &--default {
    --bg: var(--base--solid-secondary);
  }
}
</style>
