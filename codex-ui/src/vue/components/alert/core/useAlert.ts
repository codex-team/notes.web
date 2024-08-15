import { ref } from 'vue';
import type { AlertInterface, AlertOptions, AlertType } from './types';
import { createSharedComposable, useStepper } from '@vueuse/core';
import { getId } from './constant';

const useStore = createSharedComposable(() => {
  const alertStore = ref<AlertOptions[]>([]);

  /**
   * trigger alert component
   * @param type - type of alert (success, error, warning, info and default)
   * @param opt - alert options
   */
  function createAlertHandler(type: AlertType, opt?: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    opt!.id = getId();
    const alert = alertStore.value.findIndex((idx: AlertOptions) => idx.id === opt.id);

    alertStore.value.push({ type,
      ...opt });

    setTimeout(() => {
      alertStore.value.splice(alert, alertStore.value.length);
    }, opt?.timeout);
  }

  function success(opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('success', opt);
  }

  function error(opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('error', opt);
  }

  function warning(opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('warning', opt);
  }

  function info(opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    createAlertHandler('info', opt);
  }

  function defaultAlert(opt: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
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
 * @param type -
 * @param options - alert options
 */

export const useAlert = (type?: AlertType, opt?: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>) => {
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
