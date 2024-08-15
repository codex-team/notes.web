import { ref } from 'vue';
import type { AlertInterface, AlertOptions, AlertType } from './types';
import { createSharedComposable } from '@vueuse/core';

/**
 * Store alert state
 */
const useStore = createSharedComposable(() => {
  const alertStore = ref<AlertOptions[]>([]);

  /**
   * trigger alert component
   * @param type - type of alert (success, error, warning, info and default)
   * @param opt - alert options
   */
  function createAlertHandler(type: AlertType, opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    const alert = alertStore.value.findIndex((idx: AlertOptions) => idx.timeout === opt?.timeout);

    alertStore.value.push({ type,
      ...opt });

    setTimeout(() => {
      alertStore.value.splice(alert, alertStore.value.length);
    }, opt?.timeout);
  }

  function success(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('success', opt);
  }

  function error(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('error', opt);
  }

  function warning(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('warning', opt);
  }

  function info(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('info', opt);
  }

  function defaultAlert(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('default', opt);
  }

  return {
    alertStore,
    success,
    error,
    warning,
    info,
    defaultAlert,
  };
});

/**
 * Alert service
 * @param type - alert type (success, error, warning, info and default)
 * @param options - alert options
 */

export const useAlert = (type?: AlertType, opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): AlertInterface => {
  const alertRef = ref<unknown>();
  const {
    alertStore,
    success,
    error,
    warning,
    info,
    defaultAlert,
  } = useStore();

  switch (type) {
    case 'success':
      success(opt);
      break;

    case 'error':
      alertRef.value = error(opt);
      break;

    case 'warning':
      alertRef.value = warning(opt);
      break;

    case 'info':
      alertRef.value = info(opt);
      break;

    case 'default':
      alertRef.value = defaultAlert(opt);
      break;

    default:
      alertRef.value = undefined;
      break;
  }

  return {
    alertRef,
    alertStore,
    success,
    error,
    info,
    warning,
    defaultAlert,
  };
};
