import HawkCatcher from '@hawk.so/javascript';
import { createSharedComposable } from '@vueuse/core';
import type { App } from 'vue';

declare global {
  interface Window {
    /**
     * Release id added by hawk-vite-plugin
     */
    HAWK_RELEASE: string;
  }
}

export const useErrorCatcher = createSharedComposable(() => {
  /**
   * Initializes error catcher
   *
   * @param app - vue app instance
   */
  function init(app: App): void {
    new HawkCatcher({
      token: import.meta.env.VITE_HAWK_TOKEN,
      vue: app,
      release: window.HAWK_RELEASE,
    });
  }

  return {
    init,
  };
});
