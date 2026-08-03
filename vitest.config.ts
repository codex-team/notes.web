import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
  },
  resolve: {
    alias: {
      /* eslint-disable-next-line @typescript-eslint/naming-convention */
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
});
