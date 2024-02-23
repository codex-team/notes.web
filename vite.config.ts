import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      /* eslint-disable-next-line @typescript-eslint/naming-convention */
      '@/': '/src/',
    },
  },
});
