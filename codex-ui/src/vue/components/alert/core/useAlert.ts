import { ref } from 'vue';
import type { AlertInterface, AlertOptions } from './types';
import { getId } from './constant';
import { createSharedComposable } from '@vueuse/core';

export const useStore = createSharedComposable(() => {
  const alertRef = ref<HTMLElement | null>(null);
  const alertStore = ref<AlertOptions[]>([]);

  /**
   * trigger alert component
   * @param opt - alert options
   */
  function createAlertHandler(opt: AlertOptions): void {
    opt.id = getId();
    const alert = alertStore.value.findIndex((idx: AlertOptions) => idx.id === opt.id);

    alertStore.value.push(opt);

    setTimeout(() => {
      alertStore.value.splice(alert, alertStore.value.length);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, opt.timeout! || 5000);

    console.log(alertStore.value);
  }

  function success(opt: AlertOptions): void {
    return createAlertHandler(opt);
  }

  function error(opt: AlertOptions): void {
    return createAlertHandler(opt);
  }

  function warning(opt: AlertOptions): void {
    return createAlertHandler(opt);
  }

  function info(opt: AlertOptions): void {
    return createAlertHandler(opt);
  }

  function defaultAlert(opt: AlertOptions): void {
    return createAlertHandler(opt);
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
 * @param options - alert options
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useAlert(options?: AlertOptions): AlertInterface {
  const store = useStore();

  return {
    alertRef: store.alertRef,
    alertStore: store.alertStore,
    success: store.success,
    error: store.error,
    warning: store.warning,
    info: store.info,
    default: store.defaultAlert,
  };
};
