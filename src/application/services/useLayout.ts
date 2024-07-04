import { shallowRef, type ShallowRef, type Component, watch } from 'vue';
import { useRoute } from 'vue-router';
import Default from '@/presentation/layouts/ThreeColsLayout.vue';
import Fullpage from '@/presentation/layouts/Fullpage.vue';

/**
 * Layouts available in application.
 *
 * Layout — is page wrapper. You can use it to create different layouts for different pages, e.g.: multiple sidebars, etc.
 */
export const layouts = {
  /**
   * Standard layout with Centered container
   */
  default: Default,

  /**
   * Fullpage layout without container
   */
  fullpage: Fullpage,
};

/**
 * useLayout hook is setting current Layout
 * @returns Layout template was got by meta
 */
export default function (): ShallowRef<Component> {
  const layout = shallowRef(layouts.default);
  const route = useRoute();

  /**
   * Watch route meta and set layout
   */
  watch(
    () => route.meta.layout,
    (layoutName) => {
      if (layoutName !== undefined && layoutName in layouts) {
        layout.value = layouts[layoutName];
      } else {
        layout.value = layouts.default;
      }
    }
  );

  return layout;
}
