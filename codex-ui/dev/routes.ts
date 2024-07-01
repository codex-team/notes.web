import type { RouteRecordRaw } from 'vue-router';
import Index from './pages/Index.vue';
import ColorScheme from './pages/theming/ColorScheme.vue';
import BaseAndAccent from './pages/theming/BaseAndAccent.vue';
import Button from './pages/components/Button.vue';
import Input from './pages/components/Input.vue';

/**
 * Vue router routes list
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/theming/color-scheme',
    component: ColorScheme,
  },
  {
    path: '/theming/base-and-accent',
    component: BaseAndAccent,
  },
  {
    path: '/components/button',
    component: Button,
  },
  {
    path: '/components/input',
    component: Input,
  },
];

export default routes;
