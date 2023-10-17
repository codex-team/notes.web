import { shallowRef, type ShallowRef, type Component } from 'vue';
import { useRoute } from 'vue-router';
import Default from '@/presentation/layouts/Default.vue';

/**
 * Layouts available in application.
 *
 * Layout — is page wrapper. You can use it to create different layouts for different pages, e.g.: multiple sidebars, etc.
 */
export const layouts = {
  default: Default,
};

/**
 * useLayout hook is setting current Layout
 *
 * @returns { ShallowRef<string> } - Layout template was got by meta
 */
export default function (): ShallowRef<Component> {
  const layout = shallowRef(layouts.default);
  const route = useRoute();

  if (route.meta.layout !== undefined) {
    layout.value = layouts[route.meta.layout];
  }

  return layout;
}
