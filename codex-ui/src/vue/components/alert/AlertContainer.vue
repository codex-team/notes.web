<template>
  <div ref="alertRef">
    <div
      :class="[
        $style.alert__container,
        $style['alert__container--' + props.position]
      ]"
    >
      <AlertTransition>
        <BaseAlert
          v-for="alert in alertStore"
          :key="alert.id"
          v-bind="alert"
        />
      </AlertTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseAlert from './BaseAlert.vue';
import AlertTransition from './AlertTransition.vue';
import { useAlert } from './core/useAlert';
import { AlertOptions } from './core/types';
import { ALERT_CONTAINER_STYLES } from './core/constant';

const props = withDefaults(defineProps<AlertOptions>(), {
  id: ALERT_CONTAINER_STYLES.id,
  position: ALERT_CONTAINER_STYLES.position,
  content: ALERT_CONTAINER_STYLES.message,
  icon: ALERT_CONTAINER_STYLES.icon,
  type: ALERT_CONTAINER_STYLES.type,
  timeout: ALERT_CONTAINER_STYLES.timeout,
});

const { alertRef, alertStore } = useAlert(props.type, props);
</script>

<style module lang="postcss">
.alert__container  {
  --zIndex: 9999;

  position: fixed;
  min-height: 100%;
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  z-index: var(zIndex);

  &--bottom-center {
   left: 50%;
   bottom: 2rem
  }
}

</style>
