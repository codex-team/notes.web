<template>
  <div
    ref="el"
    @click="clickHandler"
  >
    <div
      class="notex-alert"
      :class="classes"
    >
      <Icon
        v-if="icon"
        :name="icon"
      />
      <div>{{ props.content }}</div>
      <span
        :class="`${ALERT_NAMESPACE}__close-button`"
        @click="closeAlert"
      >&times;
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults, ref, watch, nextTick } from 'vue';
import { useElementHover, useFocus, useDraggable } from '@vueuse/core';
import Icon from '../icon/Icon.vue';
import { AlertOptions } from './core/types';
import { ALERT_NAMESPACE } from './core/constant';
import { useAlert } from './core/useAlert';

const el = ref<HTMLElement>();

const props = withDefaults(defineProps<AlertOptions>(), {
  id: 0,
  icon: 'Check',
});

const { value: hovering } = useElementHover(el);
const { focused } = useFocus(el);
const { isDragging } = useDraggable(el);

/**
 * a progress bar can be provided using this computed property
 */
// eslint-disable-next-line no-unused-vars
const runingAlert = computed(() => !hovering && focused.value && !isDragging.value);
const { alertStore } = useAlert(props);

/**
 * close alert
 */
const closeAlert = () => {
  for (var i = alertStore.value.length - 1; i >= 0; i--) {
    if (alertStore.value[i].id === props.id) {
      alertStore.value.splice(i, 1);
    }
  }
};

watch(isDragging, (v) => {
  if (v !== null) {
    nextTick(() => closeAlert());
  }
});

/**
 * handles closure and dragging of alert box
 */
const clickHandler = () => {
  if (props.onClick) {
    props.onClick(closeAlert);
  }

  if (props.closeOnClick) {
    closeAlert();
  }
};

const classes = computed(() => {
  return [`${ALERT_NAMESPACE}`, `${ALERT_NAMESPACE}--${props.status}`, `${props.position}`];
});
</script>

<style  lang="postcss">
.notex-alert {
  --padding-left: var(--h-padding);
  --padding-right: var(--h-padding);
  --color: var(--accent--text-solid-foreground);
  --success: #00A64D;
  --error: #BB393D;
  --warning: #DE6205;
  --info: #54617B;
  --default: #54617B;

  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: var(--v-padding);
  border: 0;
  outline: 0;
  font-family: inherit;
  pointer-events: auto;
  overflow: hidden;
  word-break: keep-all;
  transform: translateZ(0);
  direction: ltr;
  padding: var(--v-padding) var(--padding-right) var(--v-padding) var(--padding-left);
  border-radius: var(--radius-field);
  box-shadow: inset 0 0 0 1px var(--border-color);
  color: var(--color);

  &--success {
    background-color: var(--success);
  }

  &--error {
    background-color: var(--error);
  }

  &--warning {
    background-color: var(--warning);
  }

  &--info {
    background-color: var(--info);
  }

  &--default {
    background-color: var(--default);
  }
}

.notex-alert__close-button {
  font-weight: bold;
  font-size: 14px;
  line-height: 14px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  padding-left: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  align-items: center;
  color: #fff;
  opacity: 0.3;
  transition: visibility 0s, opacity 0.2s linear;
  &:hover, &:focus {
    opacity: 1;
  }

}
</style>
