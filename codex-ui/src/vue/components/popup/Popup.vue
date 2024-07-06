<template>
  <div @click="trigger">
    <slot name="trigger" />
  </div>
  <div
    v-show="showPopup"
    :class="$style['popup']"
  >
    <div :class="$style['popup__container']">
      <slot name="content" />
    </div>
    <Icon
      name="Cross"
      :class="$style['popup__icon']"
    />
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import { ref } from 'vue';

const showPopup = ref(false);

withDefaults(
  defineProps<{
    /**
     * If true, a button to close the popup appears
     */
    hasCloseButton?: boolean;
  }>(),
  {
    hasCloseButton: true,
  }
);

const trigger = () => {
  showPopup.value = true;
};

</script>

<style module>

.popup {
  inset: 0;
  z-index: 100;
  display: flex;
  position: fixed;
  align-items: center;
  gap: var(--spacing-ms);
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.49);

  &__container {
    z-index: 101;
    gap: var(--spacing-ml);
    padding: var(--spacing-l);
    box-sizing: content-box;
    border-radius: var(--radius-ml);
    background-color: var(--base--bg-primary);
    box-shadow: inset 0 0 0 var(--delimiter-height) var(--base--border);
    flex-direction: row;
    justify-content: flex-end;
  }

  &__icon {
    z-index: 101;
    color: var(--base--text-secondary);
    padding: var(--spacing-very-x);
    box-shadow: inset 0 0 0 var(--delimiter-height);
    border-radius: var(--radius-l);
    align-self: center;
  }
}

</style>
