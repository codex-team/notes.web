<template>
  <TransitionGroup
    tag="div"
    name="toast"
    class="toasts"
    role="status"
    aria-live="polite"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast text-ui-base"
    >
      <Icon
        name="Warning"
        class="toast__icon"
      />
      <span class="toast__text">{{ toast.text }}</span>
      <button
        class="toast__close"
        :aria-label="t('toast.close')"
        @click="hideToast(toast.id)"
      >
        <Icon name="Cross" />
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Icon } from '@codexteam/ui/vue';
import useToast from '@/application/services/useToast';

const { t } = useI18n();
const { toasts, hideToast } = useToast();
</script>

<style scoped lang="postcss">
.toasts {
  position: fixed;
  left: 50%;
  bottom: var(--spacing-xl);
  transform: translateX(-50%);
  z-index: var(--z-popup);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-s);
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
  max-width: min(560px, calc(100vw - 2 * var(--spacing-l)));
  padding: var(--spacing-s) var(--spacing-s) var(--spacing-s) var(--spacing-m);
  border-radius: var(--radius-ml);
  background-color: var(--base--bg-secondary);
  box-shadow: inset 0 0 0 1px var(--base--border), 0 8px 24px rgb(0 0 0 / 25%);
  color: var(--base--text);
  pointer-events: auto;

  &__icon {
    flex-shrink: 0;
    color: var(--red--solid);
  }

  &__text {
    flex: 1;
  }

  &__close {
    display: flex;
    flex-shrink: 0;
    padding: var(--spacing-xxs);
    border-radius: var(--radius-s);
    color: var(--base--text-secondary);
    cursor: pointer;

    &:hover {
      color: var(--base--text);
      background-color: var(--base--bg-secondary-hover);
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 150ms, transform 150ms;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
