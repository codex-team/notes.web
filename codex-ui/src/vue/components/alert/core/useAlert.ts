import { ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { AlertInterface, AlertOptions, AlertType } from './types';
import { getId } from './constant';

const useStore = createSharedComposable(() => {
  const alertRef = ref<unknown>();
  const alertStore = ref<AlertOptions[]>([]);

  /**
   * trigger alert component
   * @param type - type of alert (success, error, warning, info and default)
   * @param opt - alert options
   */
  function createAlertHandler(type: AlertType, opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    opt.id = getId();
    const alert = alertStore.value.findIndex((idx: AlertOptions) => idx.id === opt.id);

    alertStore.value.push({ type,
      ...opt });

    setTimeout(() => {
      alertStore.value.splice(alert, alertStore.value.length);
    }, opt.timeout);
  }

  function success(type: AlertType, opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler(type, opt);
  }

  function error(type: AlertType, opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler(type, opt);
  }

  function warning(type: AlertType, opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler(type, opt);
  }

  function info(type: AlertType, opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler(type, opt);
  }

  function defaultAlert(type: AlertType, opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler(type, opt);
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

export function useAlert(type: AlertType | null, opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): AlertInterface {
  const {
    alertRef,
    alertStore,
    success,
    error,
    warning,
    info,
    defaultAlert,
  } = useStore();

  switch (type) {
    case 'success':
      alertRef.value = success(type, opt);
      break;

    case 'error':
      alertRef.value = error(type, opt);
      break;

    case 'warning':
      alertRef.value = warning(type, opt);
      break;

    case 'info':
      alertRef.value = info(type, opt);
      break;

    case 'default':
      alertRef.value = defaultAlert(type, opt);
      break;

    default:
      break;
  }

  return {
    alertRef,
    alertStore,
  };
};
