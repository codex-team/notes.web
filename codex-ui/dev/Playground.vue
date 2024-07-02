<template>
  <div :class="$style.playground">
    <div :class="$style.header">
      <a
        :class="$style.logo"
        href="/dev/index.html"
      >
        CodeX UI
      </a>
      <Tabbar
        :class="$style.headerRight"
        :tabs="[{
          title: 'Figma',
          id: 'figma-button',
          picture: 'https://cdn.svgporn.com/logos/figma.svg',
          link: 'https://www.figma.com/design/YmJc2Vqmev25xZgXic5bjL/CodeX-Design-System?node-id=1288-953&t=PhdeYMJcGnLqT4js-0'
        }]"
      />
    </div>
    <div :class="$style.body">
      <div :class="$style.aside">
        <VerticalMenu
          :items="pages"
        />
      </div>
      <div :class="$style.content">
        <router-view />
      </div>
    </div>
    <Heading :level="3">
      Avatar
    </Heading>
    <Avatar
      src="../static/example-avatar.png"
      username="Vitaly"
    />

    <Heading :level="3">
      Row
    </Heading>

    <Row
      title="Title"
      subtle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
      :has-delimiter="true"
    >
      <template #left>
        <Avatar
          src="../static/example-avatar.png"
          username="Vitaly"
        />
      </template>

      <template #right>
        <Button
          size="small"
          :style="'secondary'"
        >
          Edit
        </Button>
      </template>
    </Row>

    <Row
      title="Title"
      subtle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
      label="Time Sensitive"
    >
      <template #left>
        <Avatar
          src="../static/example-avatar.png"
          username="Vitaly"
        />
      </template>

      <template #right>
        <Button
          size="small"
          :style="'secondary'"
        >
          Edit
        </Button>
      </template>
    </Row>

    <Heading :level="3">
      Icon
    </Heading>

    <Icon name="Checklist" /> <Icon name="Loader" />
    <br>
    <Heading :level="3">
      Switch
    </Heading>
    on, default
    <Switch value />
    <br>
    on, disabled
    <Switch
      value
      disabled
    />
    <br>
    off, default
    <Switch />
    <br>
    off, disabled
    <Switch disabled />
    <br>
    <br>
    <Heading :level="3">
      Form Section
    </Heading>

    <Section
      title="List Name"
      caption="Item list"
    >
      <Row
        v-for="(item, index) in formSectionItems"
        :key="item.id"
        :title="item.name"
        :has-delimiter="index !== formSectionItems.length - 1"
      >
        <template #left>
          <Avatar
            src="../static/example-avatar.png"
            :username="item.name"
          />
        </template>

        <template #right>
          <Button
            size="small"
            :style="'secondary'"
          >
            Can View
          </Button>
        </template>
      </Row>
    </Section>
    <br>
    <Heading :level="3">
      Tab
    </Heading>
    <Tab
      id="/"
      title="Home"
    />
    <br>
    <Tab
      id="/"
      title="Home"
      picture="../static/example-avatar.png"
    />
    <br>
    <Tab
      id="/"
      title="Home"
      icon="Plus"
    />
    <br>
    <Tab
      id="/"
      title="Home"
      :closable="true"
    />
    <br>
    <Tab
      id="/"
      title="Home"
      :closable="true"
      :is-active="true"
    />
    <Heading :level="3">
      Tabbar
    </Heading>
    <Heading :level="4">
      Tabbar default
    </Heading>
    <Tabbar
      :tabs="defaultTabs"
    />
    <Heading :level="4">
      Tabbar without crosses
    </Heading>
    <Tabbar
      :tabs="tabsWithoutCrossState"
    />
    <Heading :level="3">
      Context Menu
    </Heading>
    <ContextMenu
      :show-search="true"
      :items="contextMenuItems"
    />
    <Heading :level="3">
      Vertical Menu
    </Heading>
    <VerticalMenu :items="verticalMenuItems" />
    <Heading :level="3">
      Type Scale
    </Heading>
    <TypeScale />
    <Heading :level="3">
      Editor.js
    </Heading>
    <Editor :tools="{}" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Button,
  Heading,
  Editor,
  Section,
  Icon,
  Row,
  Avatar,
  Switch,
  Tab,
  ContextMenu,
  ContextMenuItem,
  VerticalMenu,
  VerticalMenuItem,
  Tabbar,
  TabParams
} from '../src/vue';
import TypeScale from './TypeScale.vue';

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const pages = computed(() => [
  {
    title: 'TypeScale',
  },
  {
    title: 'Theming',
    items: [
      {
        title: 'Color Scheme',
        onActivate: () => router.push('/theming/color-scheme'),
        isActive: route.path === '/theming/color-scheme',
      },
      {
        title: 'Base and Accent use cases',
        onActivate: () => router.push('/theming/base-and-accent'),
        isActive: route.path === '/theming/base-and-accent',
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
        title: 'Editor',
        onActivate: () => router.push('/components/editor'),
        isActive: route.path === '/components/editor',
      },
    ],
  },
]);

/**
 * Form section items elements
 */
const formSectionItems = [
  { id: 1,
    name: 'Vitaly' },
  { id: 2,
    name: 'Nickmel' },
];

/**
 * Items for searching in the context menu
 */
const contextMenuItems: ContextMenuItem[] = [
  {
    type: 'default',
    title: 'Header 1',
    icon: 'H1',
    onActivate: doNothing,
  },
  {
    title: 'Header 2',
    icon: 'H1',
    onActivate: doNothing,
  },
  {
    type: 'separator',
  },
  {
    type: 'default',
    title: 'Header 3',
    icon: 'H1',
    onActivate: doNothing,
  },
  {
    type: 'default',
    title: 'Header 3',
    onActivate: doNothing,
  },
];

/**
 * Tabs for example usage of tabbar
 */
const defaultTabs = [
  {
    title: 'Home',
    id: '/',
    picture: '../static/example-avatar.png',
  },
  {
    title: 'New note',
    id: '/new',
    closable: true,
  },
  {
    title: 'User settings',
    id: '/settings',
    closable: true,
    isActive: true,
  },
];

const tabsWithoutCrossState: TabParams[] = [
  {
    title: 'Home',
    id: '/',
  },
  {
    title: 'New note',
    id: '/',
    closable: true,
  },
  {
    title: 'User settings',
    id: '/',
    closable: true,
    isActive: true,
  },
];

for (let _ = 0; _ < 15; ++_) {
  tabsWithoutCrossState.push({
    title: 'Marketplace',
    id: '/marketplace',
    closable: true,
    icon: 'Plus',
  });
}

/**
 * Simple function for example
 */
function doNothing(): void {}

/**
 * Items for displaing in vertical menu
 */
const verticalMenuItems: VerticalMenuItem[] = [
  {
    title: 'CodeX',
    items: [
      {
        title: 'Workflow',
      },
      {
        title: 'Enineering Strategy',
        items: [
          {
            title: 'SSH Keys',
            isActive: true,
          },
        ],
      },
      {
        title: 'Admission Campaign 2022',
      },
    ],
  },
];
</script>

<style module>
.playground {
  background-color: var(--base--bg-primary);
  color: var(--base--text);
  min-height: 100%;
}
.header {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--base--border);
  padding: var(--spacing-xs) var(--spacing-m);
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
  grid-template-columns: auto 1fr;
  gap: var(--spacing-xxl);
}
</style>
