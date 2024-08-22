import { ref } from 'vue';
import type { AlertInterface, AlertOptions, Alertype } from './Alert.types';
import { createSharedComposable } from '@vueuse/core';

/**
 * Store alerts state
 */
const useStore = createSharedComposable(() => {
  const alertStore = ref<AlertOptions[]>([]);

  /**
   * Trigger alert component
   * @param type - type of alert (success, error, warning, info and default)
   * @param opt - alert options(timeout, message and icon)
   */
  function triggerAlert(type: Alertype, opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    const alerts = alertStore.value.findIndex((idx: AlertOptions) => idx.timeout === opt?.timeout);

    alertStore.value.push({ type,
      ...opt });

    setTimeout(() => {
      alertStore.value.splice(alerts, alertStore.value.shift() as number);
    }, opt?.timeout);
  }

  function success(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    triggerAlert('success', opt);
  }

  function error(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    triggerAlert('error', opt);
  }

  function warning(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    triggerAlert('warning', opt);
  }

  function info(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    triggerAlert('info', opt);
  }

  function defaultAlert(opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    triggerAlert('default', opt);
  }

  return {
    alertStore,
    success,
    error,
    warning,
    info,
    defaultAlert,
    triggerAlert,
  };
});

/**
 * Alert service hook
 * @param type - alert type (success, error, warning, info and default)
 * @param options - alert options(icon, message and timeout)
 */

export function useAlert(type?: Alertype, opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): AlertInterface {
  const {
    alertStore,
    success,
    error,
    warning,
    info,
    defaultAlert,
    triggerAlert,
  } = useStore();

  switch (type) {
    case 'success':

      triggerAlert('success', opt);
      break;

    case 'error':
      triggerAlert('error', opt);
      break;

    case 'warning':
      triggerAlert('warning', opt);
      break;

    case 'info':
      triggerAlert('info', opt);
      break;

    case 'default':
      triggerAlert('default', opt);
      break;

    default:
      break;
  }

  return {
    alertStore,
    success,
    error,
    info,
    warning,
    defaultAlert,
  };
};
