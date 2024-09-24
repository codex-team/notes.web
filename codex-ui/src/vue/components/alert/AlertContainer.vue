<template>
  <div
    :class="[
      $style.alert__container,
      $style['alert__container--' + props.position]
    ]"
  >
    <AlertTransition>
      <Alert
        v-for="(alert, index) in alerts"
        :key="index"
        v-bind="alert"
      />
    </AlertTransition>
  </div>
</template>

<script setup lang="ts">
import Alert from './Alert.vue';
import AlertTransition from './AlertTransition.vue';
import { useAlert } from './useAlert';
import type { AlertOptions } from './Alert.types';
import { genId } from './constant';

const props = withDefaults(defineProps<AlertOptions>(), {
  id: genId(),
  position: 'bottom-center',
  content: '',
  icon: '',
  type: undefined,
  timeout: 5000,
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
