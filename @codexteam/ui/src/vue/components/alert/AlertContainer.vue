<template>
  <div
    :class="[
      $style.alert__container,
      $style['alert__container--bottom-center']
    ]"
  >
    <!-- Transition group for the list of alerts -->
    <AlertTransition>
      <Alert
        v-for="(alert) in alerts"
        :key="alert.id"
        v-bind="alert"
      />
    </AlertTransition>
  </div>
</template>

<script setup lang="ts">
import Alert from './Alert.vue';
import AlertTransition from './AlertTransition.vue';
import { useAlert } from './useAlert';
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
   transform: translateX(-50%);
   bottom: var(--spacing-l);
   width: auto;
   min-width: auto;
   max-width: auto;
  }
}
</style>
