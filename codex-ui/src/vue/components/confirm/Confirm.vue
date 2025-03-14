<template>
  <div
    :class="$style['confirm']"
    data-dimensions="large"
  >
    <div class="text-ui-base-bold">
      {{ title }}
    </div>
    <div :class="[$style['confirm__body'], 'text-ui-base-medium']">
      {{ text }}
    </div>
    <div :class="$style['confirm__controls']">
      <Button
        secondary
        @click="onCancel"
      >
        <div :class="$style['confirm__button-inner']">
          {{ cancelText }}
        </div>
      </Button>
      <Button
        primary
        @click="onConfirm"
      >
        <div :class="$style['confirm__button-inner']">
          {{ confirmText }}
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../button/Button.vue';
import { onMounted, onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * Text that will be displayed at the top of comfirm container
     */
    title: string;

    /**
     * Text that will be displayed in the middle part of the confirm container
     */
    text: string;

    /**
     * Text that will be displayed in the confirm button
     */
    confirmText?: string;

    /**
     * Text that will be displayed in the cancel button
     */
    cancelText?: string;

    /**
     * Function that is executed after pressing the Cancel button
     */
    onCancel: () => void;

    /**
     * Function that is executed after pressing the Confirm button
     */
    onConfirm: () => void;
  }>(),
  {
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  }
);

/**
 * Call onConfirm when enter was pressed
 *
 * @param event - the event object representing the keyboard event
 * @param event.key - the property of the event object that holds the value of the pressed key
 */
const confirmOnEnter = (event: { key: string }) => {
  if (event.key === 'Enter') {
    props.onConfirm();
  }
};

/**
 * Call onCancel when esc was pressed
 *
 * @param event - the event object representing the keyboard event
 * @param event.key - the property of the event object that holds the value of the pressed key
 */
const closeOnEsc = (event: { key: string }) => {
  if (event.key === 'Escape') {
    props.onCancel();
  }
};

onMounted(() => {
  document.addEventListener('keydown', confirmOnEnter);
  document.addEventListener('keydown', closeOnEsc);
});

onUnmounted(() => {
  document.removeEventListener('keydown', confirmOnEnter);
  document.removeEventListener('keydown', closeOnEsc);
});

</script>

<style module>
.confirm {
  display: flex;
  flex-direction: column;
  gap: var(--v-padding);
  text-align: center;
  width: min-content;

  &__body {
    padding: 0 var(--spacing-ml) 0 var(--spacing-ml);
    word-wrap: break-word;
  }

  &__controls {
    display: flex;
    padding: var(--v-padding) 0 0 0;
    gap: var(--spacing-m);
  }

  &__button-inner {
    width: 84px;
  }
}

</style>
