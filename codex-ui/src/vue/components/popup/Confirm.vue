<template>
  <div
    :class="$style['confirm']"
    data-dimensions="large"
  >
    <div class="text-ui-base-bold">
      {{ title }}
    </div>
    <div :class="[$style['confirm__body'], 'text-ui-base-medium']">
      {{ body }}
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

withDefaults(
  defineProps<{
    /**
     * Text that will be displayed at the top of comfirm container
     */
    title: string;

    /**
     * Text that will be displayed in the middle part of the confirm container
     */
    body: string;

    /**
     * Text that will be displayed in the confirm button
     */
    confirmText?: string;

    /**
     * Text that will be displayed in the cancel button
     */
    cancelText?: string;

    /**
     * The function that is called when click on the cancel button
     */
    onCancel: () => void;

    /**
     * The function that is called when click on the confirm button
     */
    onConfirm: () => void;
  }>(),
  {
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  }
);
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
