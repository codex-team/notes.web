import { resolve } from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      /**
       * Used to inject Vue component styles into vue.js bundle
       */
      relativeCSSInjection: true,
    }),
  ],
  build: {
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CodexUi',
      // the proper extensions will be added
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        styles: resolve(__dirname, 'src/styles/index.pcss'),
        vue: resolve(__dirname, 'src/vue/index.ts'),
      },
      output: {
        inlineDynamicImports: false,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
    },
  },
  css: {
    modules: {
      /**
       * Disable CSS Modules hash and add a custom prefix (to allow users customizing the styles)
       * @example _button_1yxsp_2 -> .cdx-button
       */
      generateScopedName: 'codex-[local]',
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '@/': '/src/',
    },
  },
  server: {
    open: '/dev/index.html',
  },
});
