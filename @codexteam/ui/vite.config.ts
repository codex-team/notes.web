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
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        /**
         * Base styles - dimensions, typography, mixins, z-axis
         */
        style: resolve(__dirname, 'src/styles/index.pcss'),

        /**
         * Individual themes for tree-shaking
         */
        'styles/themes/graphite': resolve(__dirname, 'src/styles/themes/graphite.pcss'),
        'styles/themes/crimson': resolve(__dirname, 'src/styles/themes/crimson.pcss'),
        'styles/themes/red': resolve(__dirname, 'src/styles/themes/red.pcss'),
        'styles/themes/violet': resolve(__dirname, 'src/styles/themes/violet.pcss'),
        'styles/themes/grass': resolve(__dirname, 'src/styles/themes/grass.pcss'),
        'styles/themes/amber': resolve(__dirname, 'src/styles/themes/amber.pcss'),
        'styles/themes/pure': resolve(__dirname, 'src/styles/themes/pure.pcss'),
        'styles/themes/sky': resolve(__dirname, 'src/styles/themes/sky.pcss'),

        vue: resolve(__dirname, 'src/vue/index.ts'),
      },
      output: {
        inlineDynamicImports: false,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        /**
         * Preserve module structure for better tree shaking
         */
        preserveModules: true,
        preserveModulesRoot: 'src',
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
