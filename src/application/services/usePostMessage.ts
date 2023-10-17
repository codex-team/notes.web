import { createSharedComposable } from '@vueuse/core';

/**
 * Function to be called when a message is received
 */
type Callback = (event: MessageEvent) => void;

interface UsePostMessageComposableState {
  /**
   * Adds listener if it doesn't exist and saves a callback
   */
  on: (callback: Callback) => number;

  /**
   * Removes callback by id
   */
  off: (callbackId: number) => void;
}

export const usePostMessage = createSharedComposable((): UsePostMessageComposableState => {
  /**
   * Listener for postMessage events
   */
  let listener: Callback | null = null;

  /**
   * Callbacks subscribed on postMessage events
   */
  const callbacks = new Map<number, Callback>();

  /**
   * Creates listeners, binds it to the post message and remember it
   */
  function addListener(): void {
    listener = (event: MessageEvent) => {
      callbacks.forEach((callback) => {
        callback(event);
      });
    };

    /**
     * Start listening postMessage events
     */
    window.addEventListener('message', listener);
  }

  /**
   * Removes listener
   */
  function removeListener(): void {
    if (listener === null) {
      return;
    }

    window.removeEventListener('message', listener);
    listener = null;
    callbacks.clear();
  }

  /**
   * Adds listener if it doesn't exist and saves a callback
   *
   * @param callback - Callback to be called when a message is received
   */
  function on(callback: Callback): number {
    if (listener === null) {
      addListener();
    }

    const callbackId = new Date().getTime();

    callbacks.set(callbackId, callback);

    return callbackId;
  }

  /**
   * Removes callback by id
   *
   * @param callbackId - id of callback to be removed
   */
  function off(callbackId: number): void {
    callbacks.delete(callbackId);

    if (callbacks.size === 0) {
      removeListener();
    }
  }

  return {
    on,
    off,
  };
});
