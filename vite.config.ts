import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [ vue({
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.startsWith('w3m-')
      }
    }
  }) ],
  resolve: {
    alias: {
      /* eslint-disable-next-line @typescript-eslint/naming-convention */
      '@/': '/src/',
    },
  },
});
