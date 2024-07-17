<template>
  <div ref="alertRef">
    <div
      v-for="pos in positions"
      :key="pos"
    >
      <AlertTransition
        :class="alertClasses[pos]"
        :pos="pos"
      >
        <BaseAlert
          v-for="alert in positionToasts[pos]"
          :key="alert.id"
          v-bind="alert"
        />
      </AlertTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseAlert from './BaseAlert.vue';
import AlertTransition from './AlertTransition.vue';
import { useAlert } from './core/useAlert';
import { AlertOptions, POSITION } from './core/types';
import { ALERT_CONTAINER_DEFAULTS, ALERT_NAMESPACE } from './core/constant';

const props = withDefaults(defineProps<AlertOptions>(), {
  id: ALERT_CONTAINER_DEFAULTS.id,
  position: ALERT_CONTAINER_DEFAULTS.position,
  content: ALERT_CONTAINER_DEFAULTS.content,
  closeOnClick: ALERT_CONTAINER_DEFAULTS.closeOnClick,
  icon: ALERT_CONTAINER_DEFAULTS.icon,
  status: ALERT_CONTAINER_DEFAULTS.status,
  timeout: ALERT_CONTAINER_DEFAULTS.timeout,
  onClick: ALERT_CONTAINER_DEFAULTS.onClick,
  onClose: ALERT_CONTAINER_DEFAULTS.onClose,

});

const positions = Object.values(POSITION);

// eslint-disable-next-line no-unused-vars
const asPositionRecord = <T>(getValues: (position: POSITION) => T) =>
  positions.reduce(
    (agg, position) => ({
      ...agg,
      [position]: getValues(position),
    }),
    {} as Record<POSITION, T>
  );

const { alertRef, alertStore } = useAlert(props);

const positionToasts = computed(() => {
  const getPosition = (position: POSITION) => {
    return alertStore.value.filter((alert: AlertOptions) => alert.position === position).slice(0, 20)
      .reverse();
  };

  return asPositionRecord(getPosition);
});

const alertClasses = computed(() => {
  const getClasses = (position: POSITION) => {
    const classes = [`${ALERT_NAMESPACE}__container`, position];

    return classes;
  };

  return asPositionRecord(getClasses);
});
</script>

<style lang="postcss">
.notex-alert__container  {
  --padding-left: var(--h-padding);
  --padding-right: var(--h-padding);
  --zIndex: 9999;

  position: fixed;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  z-index: var(zIndex);

  &.top-left,
  &.top-right,
  &.top-center {
    top: 1rem;
  }

  &.bottom-left,
  &.bottom-right,
  &.bottom-center {
    bottom: 1rem;
    flex-direction: column-reverse;
  }

  &.top-left,
  &.bottom-left {
    left: 1rem;
  }

  &.top-right,
  &.bottom-right {
    right: 1rem;
  }

  &.top-center,
  &.bottom-center {
    left: 50%;
    .notex-alert__alert {
      margin-inline: auto;
    }
  }
}

</style>
