<template>
  <div :class="$style.playground">
    <Heading :level="1">
      Playground
    </Heading>
    <Heading :level="3">
      Color Scheme
    </Heading>
    <RadioGroup
      :values="[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]"
      :value="colorScheme"
      name="color-scheme"
      @change="($event) => setColorScheme($event.target.value)"
    />

    <Heading :level="3">
      Base Theme
    </Heading>
    <RadioGroup
      name="base-theme"
      :value="themeBase"
      :values="[
        { label: 'Classic', value: 'classic' },
        { label: 'Crimson', value: 'crimson' },
        { label: 'Red', value: 'red' },
        { label: 'Violet', value: 'violet' },
      ]"
      @change="($event) => setBaseTheme($event.target.value)"
    />

    <Heading :level="3">
      Accent Theme
    </Heading>
    <RadioGroup
      name="accent-theme"
      :value="themeAccent"
      :values="[
        { label: 'Classic', value: 'classic' },
        { label: 'Crimson', value: 'crimson' },
        { label: 'Red', value: 'red' },
        { label: 'Violet', value: 'violet' },
      ]"
      @change="($event) => setAccentTheme($event.target.value)"
    />

    <Heading :level="3">
      Buttons
    </Heading>
    <div :class="$style.buttons">
      <div
        v-for="(button, index) in buttons"
        :key="button[0] + index"
      >
        <Button
          :size="button[0] as ButtonSize"
          :style="button[1] as ButtonStyle"
          :disabled="button[1] === 'disabled'"
        >
          Button
        </Button>
      </div>
    </div>

    <Heading :level="3">
      Input
    </Heading>
    <Input
      value="Enter email"
      size="small"
      icon="Plus"
    />
    <br>
    <br>
    <Input
      value="Enter email"
      size="medium"
      icon="Plus"
    />
    <br>
    <br>
    <Input
      value="Enter email"
      size="large"
      icon="Plus"
    />
    <br>
    <br>
    <Input
      value="Enter email"
      size="large"
      disabled
    />

    <Heading :level="3">
      Form Field
    </Heading>
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="small"
      placeholder="Placeholder"
    />
    <br>
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="medium"
      placeholder="Placeholder"
    />
    <br>
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="large"
      placeholder="Placeholder"
    />

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
      title="Home"
    />
    <br>
    <Tab
      title="Home"
      picture="../static/example-avatar.png"
    />
    <br>
    <Tab
      title="Home"
      icon="Plus"
    />
    <br>
    <Tab
      title="Home"
      :closable="true"
    />
    <br>
    <Tab
      title="Home"
      :closable="true"
      :is-active="true"
    />
    <Heading :level="3">
      Context Menu
    </Heading>
    <ContextMenu
      :show-search="true"
      :items="contextMenuItems"
      :search-icon="'Search'"
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
import { ref } from 'vue';
import {
  Button,
  Heading,
  Editor,
  Input,
  Field,
  Section,
  Icon,
  Row,
  ButtonSize,
  ButtonStyle,
  Avatar,
  Switch,
  RadioGroup,
  Tab,
  ContextMenu,
  ContextMenuItem,
  VerticalMenu,
  VerticalMenuItem
} from '../src/vue';
import TypeScale from './TypeScale.vue';
import { useTheme } from '../src/vue/composables/useTheme';
const formFieldValue = ref('Heading');

/**
 * Button samples in different states
 */
const buttons = [
  ['small'],
  ['small', 'secondary'],
  ['small', 'destructive'],
  ['small', 'disabled'],
  ['medium'],
  ['medium', 'secondary'],
  ['medium', 'destructive'],
  ['medium', 'disabled'],
  ['large'],
  ['large', 'secondary'],
  ['large', 'destructive'],
  ['large', 'disabled'],
];

const { themeBase, themeAccent, colorScheme, setBaseTheme, setAccentTheme, setColorScheme } = useTheme();

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
  padding: 20px;
}

.buttons {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: repeat(4, 1fr);
}
</style>
