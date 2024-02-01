import { resolve } from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';


import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction(outputChunk) {
        return outputChunk.facadeModuleId ? outputChunk.facadeModuleId.includes('src/styles') : true;
      }
    }),
  ],
  build: {
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CodeXDesign',
      // the proper extensions will be added
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        styles: resolve(__dirname, 'src/styles/index.ts'),
        ui: resolve(__dirname, 'src/ui/index.ts'),
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
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
})
