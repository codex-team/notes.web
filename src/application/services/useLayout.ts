import { shallowRef, type ShallowRef } from 'vue';
import { useRouter } from 'vue-router';
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
  const router = useRouter();


  router.beforeEach((to) => {
    layout.value = layouts[to.meta.layout] || Default;
  });

  return layout;
}

