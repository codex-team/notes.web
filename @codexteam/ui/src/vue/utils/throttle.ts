/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Throttle function to limit the rate of execution
 * @param callback - Function to be throttled
 * @param delay - Delay in milliseconds
 */
export function throttle(callback: () => void, delay: number): () => void {
  let lastExecTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args): void {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (timeSinceLastExec >= delay) {
      /* Execute immediately if enough time has passed */
      lastExecTime = currentTime;
      // @ts-ignore
      callback.apply(this, args);
    } else {
      /* Schedule execution for the remaining time */
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      const remainingTime = delay - timeSinceLastExec;

      timeoutId = setTimeout(() => {
        lastExecTime = Date.now();

        // @ts-ignore
        callback.apply(this, args);
        timeoutId = null;
      }, remainingTime);
    }
  };
}
