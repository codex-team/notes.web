<template>
  <div :class="$style.playground">
    <Navbar>
      <a
        :class="$style.logo"
        href="/dev/index.html"
      >
        CodeX UI
      </a>
      <template #navbar__right>
        <Tabbar
          :tabs="[{
            title: 'Figma',
            id: 'figma-button',
            picture: 'https://cdn.svgporn.com/logos/figma.svg',
            link: 'https://www.figma.com/design/YmJc2Vqmev25xZgXic5bjL/CodeX-Design-System?node-id=1288-953&t=PhdeYMJcGnLqT4js-0'
          }]"
        />
      </template>
    </Navbar>
    <div :class="$style.body">
      <div
        :class="$style.aside"
      >
        <VerticalMenu
          :items="pages"
        />
      </div>
      <div :class="$style.content">
        <router-view />
      </div>
    </div>
    <Popover />
    <Popup />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  VerticalMenu,
  Tabbar,
  Popover,
  Popup
} from '../src/vue';
import { useTheme } from '../src/vue/composables/useTheme';
import { Navbar } from '../src/vue/layout/navbar';

import { useRouter, useRoute } from 'vue-router';

useTheme();

const router = useRouter();
const route = useRoute();
const pages = computed(() => [
  {
    title: 'Base concepts',
    items: [
      {
        title: 'TypeScale',
        onActivate: () => router.push('/type-scale'),
        isActive: route.path === '/type-scale',
      },
      {
        title: 'Controls Dimensions',
        onActivate: () => router.push('/controls-dimensions'),
        isActive: route.path === '/controls-dimensions',
      },
      {
        title: 'Sizes',
        onActivate: () => router.push('/sizes'),
        isActive: route.path === '/sizes',
      },
    ],
  },
  {
    title: 'Theming',
    items: [
      {
        title: 'Base and Accent',
        onActivate: () => router.push('/theming/base-and-accent'),
        isActive: route.path === '/theming/base-and-accent',
      },
      {
        title: 'Themes',
        onActivate: () => router.push('/theming/themes'),
        isActive: route.path === '/theming/themes',
      },
      {
        title: 'Color Scheme',
        onActivate: () => router.push('/theming/color-scheme'),
        isActive: route.path === '/theming/color-scheme',
      },
      {
        title: 'Colors',
        onActivate: () => router.push('/theming/colors'),
        isActive: route.path === '/theming/colors',
      },
    ],
  },
  {
    title: 'Layout',
    items: [
      {
        title: 'Navbar',
        onActivate: () => router.push('/layout/navbar'),
        isActive: route.path === '/layout/navbar',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        title: 'Button',
        onActivate: () => router.push('/components/button'),
        isActive: route.path === '/components/button',
      },
      {
        title: 'Container',
        onActivate: () => router.push('/components/container'),
        isActive: route.path === '/components/container',
      },
      {
        title: 'Icon',
        onActivate: () => router.push('/components/icon'),
        isActive: route.path === '/components/icon',
      },
      {
        title: 'ColorShemeIcons',
        onActivate: () => router.push('/components/color-sheme-icons'),
        isActive: route.path === '/components/color-sheme-icons',
      },
      {
        title: 'ThemePreview',
        onActivate: () => router.push('/components/theme-preview'),
        isActive: route.path === '/components/theme-preview',
      },
      {
        title: 'Input',
        onActivate: () => router.push('/components/input'),
        isActive: route.path === '/components/input',
      },
      {
        title: 'Row',
        onActivate: () => router.push('/components/row'),
        isActive: route.path === '/components/row',
      },
      {
        title: 'Avatar',
        onActivate: () => router.push('/components/avatar'),
        isActive: route.path === '/components/avatar',
      },
      {
        title: 'Tabbar',
        onActivate: () => router.push('/components/tabbar'),
        isActive: route.path === '/components/tabbar',
      },
      {
        title: 'Checkbox',
        onActivate: () => router.push('/components/checkbox'),
        isActive: route.path === '/components/checkbox',
      },
      {
        title: 'Switch',
        onActivate: () => router.push('/components/switch'),
        isActive: route.path === '/components/switch',
      },
      {
        title: 'Popover',
        onActivate: () => router.push('/components/popover'),
        isActive: route.path === '/components/popover',
      },
      {
        title: 'ContextMenu',
        onActivate: () => router.push('/components/context-menu'),
        isActive: route.path === '/components/context-menu',
      },
      {
        title: 'VerticalMenu',
        onActivate: () => router.push('/components/vertical-menu'),
        isActive: route.path === '/components/vertical-menu',
      },
      {
        title: 'Select',
        onActivate: () => router.push('/components/select'),
        isActive: route.path === '/components/select',
      },
      {
        title: 'Card',
        onActivate: () => router.push('/components/card'),
        isActive: route.path === '/components/card',
      },
      {
        title: 'Form Field',
        onActivate: () => router.push('/components/field'),
        isActive: route.path === '/components/field',
      },
      {
        title: 'Section',
        onActivate: () => router.push('/components/section'),
        isActive: route.path === '/components/section',
      },
      {
        title: 'Fieldset',
        onActivate: () => router.push('/components/fieldset'),
        isActive: route.path === '/components/fieldset',
      },
      {
        title: 'Editor',
        onActivate: () => router.push('/components/editor'),
        isActive: route.path === '/components/editor',
      },
      {
        title: 'Popup',
        onActivate: () => router.push('/components/popup'),
        isActive: route.path === '/components/popup',
      },
      {
        title: 'Confirm',
        onActivate: () => router.push('/components/confirm'),
        isActive: route.path === '/components/confirm',
      },
    ],
  },
]);
</script>

<style module>
.playground {
  background-color: var(--base--bg-primary);
  color: var(--base--text);
  min-height: 100%;
}

.logo {
  font-weight: 800;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 var(--spacing-xs);
  text-decoration: none;
  color: var(--base--text);
}

.body {
  padding: var(--spacing-l);
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--spacing-xxl);
  max-width: 1200px;
}
</style>
