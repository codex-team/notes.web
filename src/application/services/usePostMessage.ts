import { createSharedComposable } from '@vueuse/core';

/**
 * Function to be called when a message is received
 */
type Callback = (event: MessageEvent) => void;

interface UsePostMessageComposableState {
  /**
   * Adds listener if it doesn't exist and saves a callback
   */
  on: (name: string, callback: Callback) => void;

  /**
   * Removes callback by name
   */
  off: (name: string) => void;
}

export const usePostMessage = createSharedComposable((): UsePostMessageComposableState => {
  /**
   * Listener for postMessage events
   */
  let listener = null;

  /**
   * Callbacks subscribed on postMessage events
   */
  const callbacks = new Map<string, Callback>();

  /**
   * Creates listeners, binds it to the post message and remember it
   */
  function addListener(): void {
    listener = (event: MessageEvent) => {
      const callback = callbacks.get(event.data.name);

      callback(event);
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
   * @param name - Name of the event
   * @param callback - Callback to be called when a message is received
   */
  function on(name: string, callback: Callback): void {
    if (listener === null) {
      addListener();
    }

    callbacks.set(name, callback);
  }

  /**
   * Removes callback by id
   *
   * @param name - name of the event to be removed
   */
  function off(name: string): void {
    callbacks.delete(name);

    if (callbacks.size === 0) {
      removeListener();
    }
  }

  return {
    on,
    off,
  };
});
