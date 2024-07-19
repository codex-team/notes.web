import { ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { AlertInterface, AlertOptions, AlertType } from './types';
import { getId } from './constant';

export const useStore = createSharedComposable(() => {
  const alertRef = ref<HTMLElement | null>(null);
  const alertStore = ref<AlertOptions[]>([]);

  /**
   * trigger alert component
   * @param opt - alert options
   */
  function createAlertHandler(opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout' | 'type'>): void {
    opt.id = getId();
    const alert = alertStore.value.findIndex((idx: AlertOptions) => idx.id === opt.id);

    alertStore.value.push(opt);

    setTimeout(() => {
      alertStore.value.splice(alert, alertStore.value.length);
    }, opt.timeout);
  }

  function success(opt: AlertOptions): void {
    createAlertHandler(opt);
  }

  function error(opt: AlertOptions): void {
    createAlertHandler(opt);
  }

  function warning(opt: AlertOptions): void {
    createAlertHandler(opt);
  }

  function info(opt: AlertOptions): void {
    createAlertHandler(opt);
  }

  function defaultAlert(opt: AlertOptions): void {
    createAlertHandler(opt);
  }

  return {
    alertRef,
    alertStore,
    createAlertHandler,
    success,
    error,
    warning,
    info,
    defaultAlert,
  };
});

/**
 * Alert service
 * @param type -
 * @param options - alert options
 */

export function useAlert(type: AlertType | null, options: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout' | 'type'>): AlertInterface {
  const store = useStore();

  if (type === options.type) {
    switch (type) {
      case 'success':
        store.success(options);
        break;

      case 'error':
        store.error(options);
        break;

      case 'warning':
        store.warning(options);
        break;

      case 'info':
        store.info(options);
        break;

      case 'default':
        store.defaultAlert(options);
        break;
    }
  } else {
    console.warn(`prop type and option type needs to be same <<codex-alert>>`);
  }

  return {
    alertRef: store.alertRef,
    alertStore: store.alertStore,
  };
};
