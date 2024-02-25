<template>
  <div :class="$style.playground">
    <Heading :level="1">Playground</Heading>
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
      text="Enter email"
      size="small"
    />
    <br />
    <Input
      text="Enter email"
      size="medium"
    />
    <br />
    <Input
      text="Enter email"
      size="large"
    />
    <br />
    <Input
      text="Enter email"
      size="large"
      disabled
    />

    <Heading :level="3"> Type Scale </Heading>
    <TypeScale />
  </div>
</template>

<script setup lang="ts">
import { Button, Heading, Input } from '../src/vue';
import TypeScale from './TypeScale.vue';

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
