import type { App } from 'vue';
import HawkCatcher from '@hawk.so/javascript';

declare global {
  interface Window {
    /**
     * Release id added by hawk-vite-plugin
     */
    HAWK_RELEASE: string;
  }
}

/**
 * Vue app plugin that initializes Hawk error catcher
 */
const HawkPlugin = {
  install(app: App) {
    const hawk = new HawkCatcher({
      token: import.meta.env.VITE_HAWK_TOKEN,
      vue: app,
      release: window.HAWK_RELEASE,
    });

    app.config.globalProperties.$hawk = hawk;
  },
};

export default HawkPlugin;
