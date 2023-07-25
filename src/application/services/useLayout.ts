import { shallowRef, ShallowRef } from 'vue';
import router from '@/application/router';
import Default from '@/presentation/layouts/Default.vue';

const layouts = {
  Default,
};

/**
 * useLayout hook is setting current Layout
 *
 * @returns { ShallowRef<string> } - Layout template was got by meta
 */
export default function (): ShallowRef<string> {
  const layout = shallowRef('div');

  router.afterEach((to) => {
    layout.value = layouts[to.meta.layout] || Default;
  });

  return layout;
}

