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

    <Heading :level="3">Row</Heading>

    <Row
      title="Title"
      subtle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
      :has-delimiter="true"
      >
      <template #left>
        <div style="width: 30px; height: 30px; background: rgb(74 230 123); border-radius: 6px;"></div>
      </template>

      <template #right>
        <Button size="small" :style="'secondary'">Edit</Button>
      </template>
    </Row>

    <Row
      title="Title"
      subtle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
      label="Time Sensitive"
      >
      <template #left>
        <div style="width: 30px; height: 30px; background: rgb(74 230 123); border-radius: 6px;"></div>
      </template>

      <template #right>
        <Button size="small" :style="'secondary'">Edit</Button>
      </template>
    </Row>

    <Heading :level="3"> Type Scale </Heading>
    <TypeScale />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Heading, Input, FormField, Row } from '../src/vue';
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
