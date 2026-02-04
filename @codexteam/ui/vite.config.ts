/* eslint-disable @typescript-eslint/naming-convention */
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
    /**
     * CSS Code Splitting: Enables CSS to be split into separate chunks
     * With cssInjectedByJsPlugin enabled:
     * - Component CSS is injected into vue.js bundle (no separate CSS files for components)
     * - Base styles are emitted as dist/style.css
     * - Fonts are emitted as dist/styles/fonts.css (optional import)
     * - Theme CSS files are emitted as dist/styles/themes/*.css
     * This allows users to import only the themes they need:
     * - import '@codexteam/ui/styles' (base styles)
     * - import '@codexteam/ui/styles/fonts' (optional fonts)
     * - import '@codexteam/ui/styles/themes/graphite' (specific theme)
     */
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        /**
         * Base styles - dimensions, typography, mixins, z-axis
         */
        style: resolve(__dirname, 'src/styles/index.pcss'),

        /**
         * Optional fonts (Inter + JetBrains Mono)
         * Exported as: @codexteam/ui/styles/fonts
         * Vite will automatically copy font files to dist/fonts/ when processing @import url()
         */
        'styles/fonts': resolve(__dirname, 'src/styles/fonts.pcss'),

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
      external: [
        'vue',
        '@vueuse/core',
        '@vueuse/shared',
        '@editorjs/editorjs',
        '@codexteam/icons',
        /**
         * Mark the red theme as external because it's imported inside the UI library itself (used for destructive buttons)
         * This prevents Rollup from trying to bundle/resolve @codexteam/ui/styles/themes/red as an internal module.
         * It also avoids Rollup silencing the "failed to resolve import" error.
         * The actual CSS file is still emitted separately via the styles/themes/red CSS entry in rollupOptions.input.
         */
        '@codexteam/ui/styles/themes/red',
        '@codexteam/ui/styles/themes/red.css',
      ],
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
      '@/': '/src/',
    },
  },
  server: {
    open: '/dev/index.html',
  },
});
