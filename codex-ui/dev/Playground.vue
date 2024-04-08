<template>
  <div :class="$style.playground">
    <Heading :level="1">Playground</Heading>
    <Heading :level="3">colorScheme:</Heading>
    <div :class="$style.buttons">
      <Button
        size="small"
        @click="() => setColorScheme('light')"
      >
        Light
      </Button>

      <Button
        size="small"
        @click="() => setColorScheme('dark')"
      >
        Dark
      </Button>
      </div>
    <br/>
    <Heading :level="3">Base Colors:</Heading>
    <div :class="$style.buttons">
      <Button
        size="small"
        @click="() => setBaseColor('classic')"
      >
        Classic
      </Button>

      <Button
        size="small"
        @click="() => setBaseColor('crimson')"
      >
        Crimson
      </Button>

      <Button
        size="small"
        @click="() => setBaseColor('red')"
      >
        Red
      </Button>

      <Button
        size="small"
        @click="() => setBaseColor('violet')">
          Violet
      </Button>
      </div>
    <br/>
    <Heading :level="3">Accent Colors:</Heading>
    <div :class="$style.buttons">
      <Button
        size="small"
        @click="() => setAccentColor('classic')"
      >
        Classic
      </Button>

      <Button
        size="small"
        @click="() => setAccentColor('crimson')"
      >
        Crimson
      </Button>

      <Button
        size="small"
        @click="() => setAccentColor('red')"
      >
        Red
      </Button>

      <Button
        size="small"
        @click="() => setAccentColor('violet')"
      >
        Violet
      </Button>
      </div>
    <Heading :level="3">Buttons</Heading>
    <div :class="$style.buttons">
      <div v-for="button in buttons">
        <Button
          :size="button[0]"
          :style="button[1]"
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
    <FormField
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="small"
    />
    <br />
    <FormField
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="medium"
    />
    <br />
    <FormField
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="large"
    />

    <Heading :level="3"> Type Scale </Heading>
    <TypeScale />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Heading, Input, FormField } from '../src/vue';
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

function setBaseColor(color: string) {
  document.body.setAttribute('theme-base', color);
}

function setAccentColor(color: string) {
  document.body.setAttribute('theme-accent', color);
}

function setColorScheme(colorScheme: string) {
  document.body.setAttribute('color-scheme', colorScheme);
}
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
