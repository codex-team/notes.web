<template>
  <div :class="$style.playground">
    <Heading :level="1">Playground</Heading>
    <Heading :level="3">Color Scheme</Heading>
    <RadioGroup
      :values="[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]"
      value="dark"
      name="color-scheme"
      @change="($event) => setColorScheme($event.target.value)"
    />

    <Heading :level="3">Base Theme</Heading>
    <RadioGroup
      name="base-theme"
      value="classic"
      :values="[
        { label: 'Classic', value: 'classic' },
        { label: 'Crimson', value: 'crimson' },
        { label: 'Red', value: 'red' },
        { label: 'Violet', value: 'violet' },
      ]"
      @change="($event) => setBaseTheme($event.target.value)"
    />

    <Heading :level="3">Accent Theme</Heading>
    <RadioGroup
      name="accent-theme"
      value="classic"
      :values="[
        { label: 'Classic', value: 'classic' },
        { label: 'Crimson', value: 'crimson' },
        { label: 'Red', value: 'red' },
        { label: 'Violet', value: 'violet' },
      ]"
      @change="($event) => setAccentTheme($event.target.value)"
    />

    <Heading :level="3">Buttons</Heading>
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

    <Heading :level="3"> Input </Heading>
    <Input
      value="Enter email"
      size="small"
    />
    <br />
    <br />
    <Input
      value="Enter email"
      size="medium"
    />
    <br />
    <br />
    <Input
      value="Enter email"
      size="large"
    />
    <br />
    <br />
    <Input
      value="Enter email"
      size="large"
      disabled
    />

    <Heading :level="3">Form Field</Heading>
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="small"
    />
    <br />
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="medium"
    />
    <br />
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="large"
    />

    <Heading :level="3">Avatar</Heading>
    <Avatar
      src="../static/example-avatar.png"
      username="Vitaly"
    />

    <Heading :level="3">Row</Heading>

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
          >Edit</Button
        >
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
          >Edit</Button
        >
      </template>
    </Row>

    <Heading :level="3"> Icon </Heading>

    <Icon name="Checklist" /> <Icon name="Loader" />
    <br />
    <Heading :level="3">Switch</Heading>
    on, default
    <Switch state="default"></Switch>
    <br />
    on, disabled
    <Switch state="disabled"></Switch>
    <br />
    off, default
    <Switch
      state="default"
      :value="false"
    ></Switch>
    <br />
    off, disabled
    <Switch
      state="disabled"
      :value="false"
    ></Switch>
    <br />
    <br />
    <Heading :level="3">Form Section</Heading>

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
            >Can View</Button
          >
        </template>
      </Row>
    </Section>
    <br />
    <Heading :level="3">Switch</Heading>
    on, default
    <Switch state="default"></Switch>
    <br />
    on, disabled
    <Switch state="disabled"></Switch>
    <br />
    off, default
    <Switch
      state="default"
      :value="false"
    ></Switch>
    <br />
    off, disabled
    <Switch
      state="disabled"
      :value="false"
    ></Switch>
    <br />
    <br />
    <Heading :level="3"> Type Scale </Heading>
    <TypeScale />
    <Heading :level="3">Editor.js</Heading>
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
} from '../src/vue';
import TypeScale from './TypeScale.vue';

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

/**
 * Set the base color
 *
 * @param color - The base color to set
 */
function setBaseTheme(color: string) {
  document.body.setAttribute('theme-base', color);
}

/**
 * Set the accent color
 *
 * @param color - The accent color to set
 */
function setAccentTheme(color: string) {
  document.body.setAttribute('theme-accent', color);
}

/**
 * Set the color scheme
 *
 * @param colorScheme - The color scheme to set('light' | 'dark')
 */
function setColorScheme(colorScheme: string) {
  document.body.setAttribute('color-scheme', colorScheme);
}

/**
 * Form section items elements
 */
const formSectionItems = [
  { id: 1, name: 'Vitaly' },
  { id: 2, name: 'Nickmel' },
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
