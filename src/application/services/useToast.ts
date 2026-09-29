import { createSharedComposable } from '@vueuse/core';
import { ref, type Ref } from 'vue';

/**
 * Short message shown at the bottom of the screen
 */
export interface Toast {
  id: number;
  text: string;
}

interface UseToastComposableState {
  /**
   * Messages currently shown
   */
  toasts: Ref<Toast[]>;

  /**
   * Shows the message for a few seconds
   * @param text - message
   */
  showToast: (text: string) => void;

  /**
   * Hides the message
   * @param id - message id
   */
  hideToast: (id: number) => void;
}

/**
 * How long a message is shown
 */
const TOAST_DURATION = 6000;

/**
 * At most this many messages are shown at once
 */
const MAX_TOASTS = 3;

export default createSharedComposable((): UseToastComposableState => {
  const toasts = ref<Toast[]>([]);

  let lastId = 0;

  function hideToast(id: number): void {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  }

  function showToast(text: string): void {
    if (toasts.value.some(toast => toast.text === text)) {
      return;
    }

    const id = ++lastId;

    toasts.value = [
      ...toasts.value.slice(1 - MAX_TOASTS),
      {
        id,
        text,
      },
    ];
    setTimeout(() => hideToast(id), TOAST_DURATION);
  }

  return {
    toasts,
    showToast,
    hideToast,
  };
});
