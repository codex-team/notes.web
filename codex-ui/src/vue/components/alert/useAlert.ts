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

  /**
   * Trigger alert component
   * @param type alert type (success, error, warning, info and default)
   * @param opt alert options(timeout, message and icon)
   */
  function triggerAlert(type: AlertType, opt: AlertOptions): void {
    const index = alerts.value.findIndex(m => m.id === opt.id);

    if (opt.id == null) {
      opt.id = counter.value++;
      opt.type = type;
    }

    alerts.value = [...alerts.value, opt];
    // alerts.value.push({ type,
    //   ...opt });

    if (index !== 0) {
      setTimeout(() => {
        alerts.value.splice(alerts.value[opt?.id], 1);
      }, opt?.timeout);
    }

    console.log('counter id', opt.id);
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
