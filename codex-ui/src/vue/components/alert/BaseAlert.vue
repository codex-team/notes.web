<template>
  <div
    ref="el"
  >
    <div
      :class="[
        $style.alert,
        $style['alert--' + computedStyle]
      ]"
    >
      <Icon
        v-if="icon"
        :name="icon ?? null"
      />
      <div>{{ props.message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults, ref } from 'vue';
import Icon from '../icon/Icon.vue';
import { AlertOptions, AlertType } from './core/types';
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
 * compute serveral style type
 */
const computedStyle = computed<AlertType>(() => {
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

  return 'default';
});

</script>

<style module lang="postcss">
.alert {
  --padding-left: var(--h-padding);
  --padding-right: var(--h-padding);
  --color: var(--accent--text-solid-foreground);
  --bg: var(--base-text);
  --bg-success: var(--base-alert-success);
  --bg-error: var(--base-alert-error);
  --bg-warning: var(--base-alert-warning);
  --bg-info: var(--base-alert-info);
  --bg-default: var(--base--bg-primary);

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
    background-color: var(--bg-success);
  }

  &--error {
    background-color: var(--bg-error);
  }

  &--warning {
    background-color: var(--bg-warning);
  }

  &--info {
    background-color: var(--bg-info);
  }

  &--default {
    background-color: var(--bg-default);
  }
}
</style>
