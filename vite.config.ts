import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import hawkVitePlugin from '@hawk.so/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      hawkVitePlugin({
        token: env.VITE_HAWK_TOKEN,
      }),
    ],
    resolve: {
      alias: {
        /* eslint-disable-next-line @typescript-eslint/naming-convention */
        '@/': '/src/',
      },
    },
  };
});
