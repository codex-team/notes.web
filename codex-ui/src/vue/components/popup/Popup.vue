<template>
  <div @click="trigger">
    <slot name="trigger" />
  </div>
  <Teleport
    to="body"
  >
    <div
      v-show="showPopup"
      :class="$style['popup']"
    >
      <div :class="$style['popup__container']">
        <slot name="content" />
      </div>
      <Icon
        v-if="hasCloseButton"
        :class="$style['popup__icon']"
        name="Cross"
        @click="close"
      />
    </div>
  </Teleport>
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

const close = () => {
  showPopup.value = false;
};

</script>

<style module>

.popup {
  inset: 0;
  display: grid;
  grid-template-columns: auto auto;
  position: fixed;
  align-content: center;
  gap: var(--spacing-l);
  justify-content: center;
  align-items: start;
  background-color: rgba(0, 0, 0, 0.49);
  align-items: baseline;
  color: var(--base--text);

  &__container {
    gap: var(--spacing-ml);
    padding: var(--spacing-l);
    border-radius: var(--radius-ml);
    background-color: var(--base--bg-primary);
    box-shadow: inset 0 0 0 var(--delimiter-height) var(--base--border);
  }

  &__icon {
    cursor: pointer;
    color: var(--base--text-secondary);
    padding: var(--spacing-very-x);
    box-shadow: inset 0 0 0 var(--delimiter-height);
    border-radius: var(--radius-l);
  }
}

</style>
