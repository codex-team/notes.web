import type { Ref } from 'vue';
import { onUnmounted, ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { AlertOptions } from './Alert.types';

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
  const ANIMATION_DELAY = 50; // ms delay for smooth animations

  // Batch removal of expired alerts to prevent layout thrashing
  function removeExpiredAlerts(): void {
    const currentTime = new Date().getTime();
    // Check if any alerts have expired by comparing their timeout
    // timestamps to the current time. If any have expired, we'll
    // need to remove them from the list of visible alerts.
    const hasExpiredAlerts = alerts.value.some(
      alert => alert.timeout <= currentTime
    );

    if (hasExpiredAlerts) {
      // Use requestAnimationFrame to batch DOM updates
      requestAnimationFrame(() => {
        alerts.value = alerts.value.filter(alert => alert.timeout > currentTime);
      });
    }
  }

  function scheduleRemoval(alertId: number, timeout: number): void {
    const startTime = performance.now();
    let lastFrameTime = startTime;
    const FRAME_TIME_MS = 16.67; // ~60fps
    const removalThreshold = FRAME_TIME_MS * 2; // ~2 frames at 60fps

    const checkExpiry = (timestamp: number): void => {
      // Skip frames if we're calling too frequently
      if (timestamp - lastFrameTime < removalThreshold) {
        const frameId = requestAnimationFrame(checkExpiry);

        animationFrameIds.set(alertId, frameId);

        return;
      }
      lastFrameTime = timestamp;

      const elapsed = timestamp - startTime;

      if (elapsed >= timeout) {
        // Use a slight delay to ensure smooth animation
        setTimeout(() => {
          removeExpiredAlerts();
          animationFrameIds.delete(alertId);
        }, ANIMATION_DELAY);
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
   * @param opt alert options
   */
  function triggerAlert(opt: AlertOptions): void {
    if (opt.timeout === Infinity) {
      return;
    }

    const currentTime = new Date().getTime();
    const currentTimeout = currentTime + opt.timeout;

    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
      if (alerts.value.length >= maxAlerts) {
        // Find and remove the oldest alert (smallest ID)
        const oldestAlert = alerts.value.reduce((prev, current) => {
          if (prev?.id === undefined || current.id === undefined) {
            return current;
          }

          return (prev.id < current.id) ? prev : current;
        });

        // Remove the oldest alert
        alerts.value = alerts.value.filter(alert => alert.id !== oldestAlert?.id);
      }

      const newAlert = {
        ...opt,
        id: counter.value++,
        timeout: currentTimeout,
      };

      // Add new alert at the beginning of the array
      alerts.value = [newAlert, ...alerts.value];

      // Schedule removal with a small delay to ensure smooth animation
      setTimeout(() => {
        scheduleRemoval(Number(newAlert.id), opt.timeout);
      }, ANIMATION_DELAY);
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
    success: (opt: Omit<AlertOptions, 'id' | 'type'>) => triggerAlert({ ...opt,
      type: 'success' }),
    error: (opt: Omit<AlertOptions, 'id' | 'type'>) => triggerAlert({ ...opt,
      type: 'error' }),
    warning: (opt: Omit<AlertOptions, 'id' | 'type'>) => triggerAlert({ ...opt,
      type: 'warning' }),
    info: (opt: Omit<AlertOptions, 'id' | 'type'>) => triggerAlert({ ...opt,
      type: 'info' }),
    alert: (opt: Omit<AlertOptions, 'id' | 'type'>) => triggerAlert({ ...opt,
      type: 'default' }),
  };
});
