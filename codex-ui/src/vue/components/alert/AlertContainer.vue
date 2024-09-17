<template>
  <div
    :class="[
      $style.alert__container,
      $style['alert__container--' + props.position]
    ]"
  >
    <AlertTransition>
      <BaseAlert
        v-for="(alert, index) in alerts"
        :key="index"
        v-bind="alert"
      />
    </AlertTransition>
  </div>
</template>

<script setup lang="ts">
import BaseAlert from './BaseAlert.vue';
import AlertTransition from './AlertTransition.vue';
import { useAlert } from './useAlert';
import type { AlertOptions } from './Alert.types';
import { ALERT_CONTAINER_STYLES } from './constant';

const props = withDefaults(defineProps<AlertOptions>(), {
  position: ALERT_CONTAINER_STYLES.position,
  content: ALERT_CONTAINER_STYLES.message,
  icon: ALERT_CONTAINER_STYLES.icon,
  type: ALERT_CONTAINER_STYLES.type,
  timeout: ALERT_CONTAINER_STYLES.timeout,
});

const { alerts } = useAlert();

</script>

<style module lang="postcss">
.alert__container  {
  position: fixed;
  min-height: 100%;
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  z-index: var(--z-alert);

  &--bottom-center {
   left: 50%;
   bottom: 2rem
  }
}

</style>
