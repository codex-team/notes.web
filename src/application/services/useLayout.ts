import { shallowRef, ShallowRef } from 'vue';
import router from '@/application/router';
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue';

const layouts = {
  DefaultLayout,
};

/**
 * useLayout hook is setting current Layout
 *
 * @returns { ShallowRef<string> } - Layout template was got by meta
 */
export default function (): ShallowRef<string> {
  const layout = shallowRef('div');

  router.afterEach((to) => {
    layout.value = layouts[to.meta.layout] || 'div';
  });

  return layout;
}

