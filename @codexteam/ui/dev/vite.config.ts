import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  root: __dirname,
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      /* Externalize Vue and vue-router (loaded from CDN) */
      external: ['vue', 'vue-router'],
      output: {
        /* Ensure relative paths work for static demo */
        assetFileNames: 'assets/[name].[ext]',
        globals: {
          vue: 'Vue',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'vue-router': 'VueRouter',
        },
      },
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '@': resolve(__dirname, '../src'),
    },
  },
  server: {
    open: '/index.html',
  },
});
