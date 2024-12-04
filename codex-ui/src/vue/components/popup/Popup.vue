<template>
  <div
    v-show="isOpen"
    :class="$style['popup']"
  >
    <div
      ref="popupEl"
      :class="$style['popup__container']"
    >
      <component
        :is="content.component"
        v-if="content"
        v-bind="content.props"
      />
    </div>
    <Icon
      v-if="hasCloseButton"
      :class="$style['popup__icon']"
      name="Cross"
      @click="hidePopup"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Icon from '../icon/Icon.vue';
import { usePopup } from './usePopup';
import { onClickOutside } from '@vueuse/core';

/**
 * Reference to the popup element
 * Used to bind click-outside event
 */
const popupEl = ref<HTMLDivElement | null>(null);

const {
  isOpen,
  hidePopup,
  content,
} = usePopup();

/**
 * Close the popup when clicking outside of popup container
 */
onClickOutside(popupEl, hidePopup);

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

</script>

<style module>

.popup {
  z-index: var(--z-popup);
  inset: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  position: fixed;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.49);
  color: var(--base--text);

  &__container {
    grid-column: 2;
    padding: var(--spacing-l);
    border-radius: var(--radius-ml);
    background-color: var(--base--bg-primary);
    box-shadow: inset 0 0 0 var(--delimiter-height) var(--base--border);
  }

  &__icon {
    grid-column: 3;
    cursor: pointer;
    color: var(--base--text-secondary);
    padding: var(--spacing-very-x);
    box-shadow: inset 0 0 0 var(--delimiter-height);
    border-radius: var(--radius-l);
    margin-left: var(--spacing-l);
    margin-top: var(--spacing-xs);

    &:hover {
      color: var(--base--text);
    }
  }
}

</style>
