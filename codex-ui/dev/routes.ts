import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
import Index from './pages/Index.vue';
import TypeScale from './pages/base-concepts/TypeScale.vue';
import ControlsDimensions from './pages/base-concepts/ControlsDimensions.vue';
import Sizes from './pages/base-concepts/Sizes.vue';
import BaseAndAccent from './pages/theming/BaseAndAccent.vue';
import Themes from './pages/theming/Themes.vue';
import Colors from './pages/theming/Colors.vue';
import ColorScheme from './pages/theming/ColorScheme.vue';
import Button from './pages/components/Button.vue';
import Input from './pages/components/Input.vue';
import Field from './pages/components/Field.vue';
import Avatar from './pages/components/Avatar.vue';
import Card from './pages/components/Card.vue';
import Checkbox from './pages/components/Checkbox.vue';
import Container from './pages/components/Container.vue';
import Fieldset from './pages/components/Fieldset.vue';
import Icon from './pages/components/Icon.vue';
import Picture from './pages/components/Picture.vue';
import Popover from './pages/components/Popover.vue';
import Row from './pages/components/Row.vue';
import Section from './pages/components/Section.vue';
import Select from './pages/components/Select.vue';
import Switch from './pages/components/Switch.vue';
import Tabbar from './pages/components/Tabbar.vue';
import VerticalMenu from './pages/components/VerticalMenu.vue';
import ContextMenu from './pages/components/ContextMenu.vue';
import Editor from './pages/components/Editor.vue';

/**
 * Vue router routes list
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index as Component,
  },
  {
    path: '/type-scale',
    component: TypeScale as Component,
  },
  {
    path: '/controls-dimensions',
    component: ControlsDimensions as Component,
  },
  {
    path: '/sizes',
    component: Sizes as Component,
  },
  {
    path: '/theming/themes',
    component: Themes as Component,
  },
  {
    path: '/theming/colors',
    component: Colors as Component,
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
  {
    path: '/components/row',
    component: Row as Component,
  },
  {
    path: '/components/section',
    component: Section as Component,
  },
  {
    path: '/components/select',
    component: Select as Component,
  },
  {
    path: '/components/switch',
    component: Switch as Component,
  },
  {
    path: '/components/tabbar',
    component: Tabbar as Component,
  },
  {
    path: '/components/vertical-menu',
    component: VerticalMenu as Component,
  },
  {
    path: '/components/avatar',
    component: Avatar as Component,
  },
  {
    path: '/components/card',
    component: Card as Component,
  },
  {
    path: '/components/checkbox',
    component: Checkbox as Component,
  },
  {
    path: '/components/container',
    component: Container as Component,
  },
  {
    path: '/components/fieldset',
    component: Fieldset as Component,
  },
  {
    path: '/components/icon',
    component: Icon as Component,
  },
  {
    path: '/components/picture',
    component: Picture as Component,
  },
  {
    path: '/components/popover',
    component: Popover as Component,
  },
  {
    path: '/components/context-menu',
    component: ContextMenu as Component,
  },
  {
    path: '/components/editor',
    component: Editor as Component,
  },
];

export default routes;
