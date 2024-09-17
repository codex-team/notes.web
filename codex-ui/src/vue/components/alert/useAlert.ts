import { ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { AlertInterface, AlertOptions, Alertype } from './Alert.types';

/**
 * Alert service hook
 */
export const useAlert = createSharedComposable((): AlertInterface => {
  const alerts = ref<AlertOptions[]>([]);

  /**
   * Trigger alert component
   * @param type type of alert (success, error, warning, info and default)
   * @param opt alert options(timeout, message and icon)
   */
  function triggerAlert(type?: Alertype, opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>): void {
    const alertIndex = alerts.value.findIndex((idx: AlertOptions) => idx.timeout === opt?.timeout);

    alerts.value.push({ type,
      ...opt });

    setTimeout(() => {
      alerts.value.splice(alertIndex, alerts.value.shift() as number);
    }, opt?.timeout);
  }

  return {
    alerts,
    success: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => triggerAlert('success', opt),
    error: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => triggerAlert('error', opt),
    warning: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => triggerAlert('warning', opt),
    info: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => triggerAlert('info', opt),
    defaultAlert: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => triggerAlert('default', opt),
  };
});
