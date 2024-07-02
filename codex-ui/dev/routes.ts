import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
import Index from './pages/Index.vue';
import ColorScheme from './pages/theming/ColorScheme.vue';
import BaseAndAccent from './pages/theming/BaseAndAccent.vue';
import Button from './pages/components/Button.vue';
import Input from './pages/components/Input.vue';
import Field from './pages/components/Field.vue';

/**
 * Vue router routes list
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index as Component,
  },
  {
    path: '/theming/color-scheme',
    component: ColorScheme as Component,
  },
  {
    path: '/theming/base-and-accent',
    component: BaseAndAccent as Component,
  },
  {
    path: '/components/button',
    component: Button as Component,
  },
  {
    path: '/components/input',
    component: Input as Component,
  },
  {
    path: '/components/field',
    component: Field as Component,
  },
];

export default routes;
