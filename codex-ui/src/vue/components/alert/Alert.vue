<template>
  <transition name="fadeInBottom">
    <div
      v-show="message"
      class="alert"
      :class="`alert--${alertType}`"
    >
      <Icon name="Check" />
      <span v-if="props.message">{{ message }}</span>
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue';
import Icon from '../icon/Icon.vue';

const props = withDefaults(
  defineProps<{
  /**
   * message to display
   */
    message?: string;

    /**
     * alert status
     */
    type: 'success' | 'error' | 'warning' | 'default' | 'info';

  }>(), {
    message: '',
    type: 'default',
  }
);

/** determine alert status */
const alertType = computed(() => {
  if (props.type === 'success') {
    return 'success';
  }

  if (props.type === 'error') {
    return 'error';
  }

  if (props.type === 'warning') {
    return 'warning';
  }

  if (props.type === 'info') {
    return 'info';
  }

  return 'default';
});

</script>

<style  lang="postcss">

@keyframes fadeInBottom {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.alert {
  --padding-left: var(--h-padding);
  --padding-right: var(--h-padding);
  --success: #00A64D;
  --error: #BB393D;
  --warning: #DE6205;
  --info: #54617B;
  --default: #54617B;

  position: fixed;
  bottom: 0;
  left: 50%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: inherit;
  gap: var(--v-padding);
  border: 0;
  outline: 0;
  font-family: inherit;
  cursor: text;
  word-break: keep-all;
  z-index: 1;
  border-radius: var(--radius-field);
  padding: 1rem;

  &--success {
    background-color: var(--success);
  }

  &--error {
    background-color: var(--error);
  }

  &--warning {
    background-color: var(--warning);
  }

  &--default {
    background-color: var(--default);
  }

  &--info {
    background-color: var(--info);
  }
}

.fadeInBottom__fade-enter-active {
  animation-name: fadeInBottom;
}

.fadeInBottom__fade-leave-active,
.fadeInBottom__fade-enter-active {
  animation-duration: 750ms;
  animation-fill-mode: both;
}

.fadeInBottom__fade-move {
  transition-timing-function: ease-in-out;
  transition-property: all;
  transition-duration: 400ms;
}
</style>
