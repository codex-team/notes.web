import type { Ref } from 'vue';
import { ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { AlertOptions, AlertType } from './Alert.types';

/**
 * Return values of useAlert composable
 */
export interface UseAlertComposableState {

  /**
   * Iterated store of alerts
   */
  alerts: Ref<AlertOptions[]>;

  /**
   * trigger success alert
   * @param opt - alert options
   */
  success: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger error alert
   * @param opt - alert options
   */
  error: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger warning alert
   * @param opt - alert options
   */
  warning: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger info alert
   * @param opt - alert options
   */
  info: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger default alert
   * @param opt - alert options
   */
  alert: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;
}

/**
 * Alert service composable hook
 */
export const useAlert = createSharedComposable((): UseAlertComposableState => {
  const counter = ref(0);
  const alerts = ref<AlertOptions[]>([]);

  function removeExpiredAlerts(): void {
    const currentTime = new Date().getTime();

    alerts.value = alerts.value.filter(alert => alert.timeout > currentTime);
  }

  /**
   * Trigger alert component
   * @param type alert type (success, error, warning, info and default)
   * @param opt alert optiontimeout, message and icon)
   */
  function triggerAlert(type: AlertType, opt: AlertOptions): void {
    if (opt.timeout === Infinity) {
      return;
    }

    const currentTime = new Date().getTime();
    const currentTimeout = currentTime + opt.timeout;

    opt.id = counter.value++, opt.type = type, opt.timeout = currentTimeout;

    alerts.value = [...alerts.value, opt];
    setInterval(removeExpiredAlerts, currentTimeout);
  }

  return {
    alerts,
    success: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('success', opt),
    error: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('error', opt),
    warning: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('warning', opt),
    info: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('info', opt),
    alert: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('default', opt),
  };
});
