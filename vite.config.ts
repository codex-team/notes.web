import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [ vue() ],
  resolve: {
    alias: {
      /* eslint-disable @typescript-eslint/naming-convention */
      '@application': '/src/application',
      '@domain': '/src/domain',
      '@infrastructure': '/src/infrastructure',
      '@presentation': '/src/presentation',
      '@': '/src',
      /* eslint-enable @typescript-eslint/naming-convention */
    },
  },
});
