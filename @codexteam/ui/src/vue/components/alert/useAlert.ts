import type { Ref } from 'vue';
import { onUnmounted, ref } from 'vue';
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
  const maxAlerts = 10; // Default maximum number of alerts
  const alerts = ref<AlertOptions[]>([]);
  const animationFrameIds = new Map<number, number>();

  function removeExpiredAlerts(): void {
    const currentTime = new Date().getTime();

    alerts.value = alerts.value.filter(alert => alert.timeout > currentTime);
  }

  function scheduleRemoval(alertId: number, timeout: number): void {
    const startTime = performance.now();

    const checkExpiry = (timestamp: number): void => {
      const elpased = timestamp - startTime;

      if (elpased >= timeout) {
        removeExpiredAlerts();
        animationFrameIds.delete(alertId);
      } else {
        const frameId = requestAnimationFrame(checkExpiry);

        animationFrameIds.set(alertId, frameId);
      }
    };

    const frameId = requestAnimationFrame(checkExpiry);

    animationFrameIds.set(alertId, frameId);
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

    if (alerts.value.length >= maxAlerts) {
      // Find and remove the oldest alert (smallest ID)
      const oldestAlert = alerts.value.reduce((prev, current) => {
        if (prev?.id === undefined || current.id === undefined) {
          return prev;
        }

        return (prev.id < current.id) ? prev : current;
      });

      alerts.value = alerts.value.filter(alert => alert.id !== oldestAlert?.id);
    }

    const newAlert = {
      ...opt,
      id: counter.value++,
      type,
      timeout: currentTimeout,
    };

    alerts.value = [newAlert, ...alerts.value];

    requestAnimationFrame(() => {
      scheduleRemoval(Number(newAlert.id), opt.timeout);
    });
  }

  onUnmounted(() => {
    animationFrameIds.forEach((frameId) => {
      cancelAnimationFrame(frameId);
    });

    animationFrameIds.clear();
  });

  return {
    alerts,
    success: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('success', opt),
    error: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('error', opt),
    warning: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('warning', opt),
    info: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('info', opt),
    alert: (opt: Omit<AlertOptions, 'id'>) => triggerAlert('default', opt),
  };
});
