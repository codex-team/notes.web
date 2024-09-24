import type { Ref } from 'vue';
import { ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { AlertOptions, Alertype } from './Alert.types';

export interface UseAlertComposableState {
  /**
   * Iterated store of alerts
   */
  alerts: Ref<AlertOptions[]>;

  /**
   * trigger success alert
   * @param opt - alert options
   */
  success: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger error alert
   * @param opt - alert options
   */
  error: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger warning alert
   * @param opt - alert options
   */
  warning: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger info alert
   * @param opt - alert options
   */
  info: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger default alert
   * @param opt - alert options
   */
  alert: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;
}

/**
 * Alert service hook
 */
export const useAlert = createSharedComposable((): UseAlertComposableState => {
  const alerts = ref<AlertOptions[]>([]);

  /**
   * Trigger alert component
   * @param type type of alert (success, error, warning, info and default)
   * @param opt alert options(timeout, message and icon)
   */
  function triggerAlert(type?: Alertype, opt?: Pick<AlertOptions, 'id' | 'icon' | 'message' | 'timeout'>): void {
    const alertIndex = alerts.value.findIndex((idx: AlertOptions) => idx.id === opt?.id);

    alerts.value.push({ type,
      ...opt });

    setTimeout(() => {
      alerts.value.splice(alertIndex, alerts.value.shift() as number);
    }, opt?.timeout);
  }

  return {
    alerts,
    success: (opt?: Omit<AlertOptions, 'id'>) => triggerAlert('success', opt),
    error: (opt?: Omit<AlertOptions, 'id'>) => triggerAlert('error', opt),
    warning: (opt?: Omit<AlertOptions, 'id'>) => triggerAlert('warning', opt),
    info: (opt?: Omit<AlertOptions, 'id'>) => triggerAlert('info', opt),
    alert: (opt?: Omit<AlertOptions, 'id'>) => triggerAlert('default', opt),
  };
});
