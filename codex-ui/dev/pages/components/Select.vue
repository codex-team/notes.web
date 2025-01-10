<template>
  <PageHeader>
    Select
    <template #description>
      Component of the form that allows you to select one or more options from the list (currently one)
    </template>
  </PageHeader>
  <div class="ex">
    Default
    <Select
      v-model="currentItem"
      :align="{vertically: 'below', horizontally: 'left'}"
      :is-disabled="false"
      :items="options"
    />
    Disabled
    <Select
      v-model="currentItem"
      :align="{vertically: 'below', horizontally: 'left'}"
      :is-disabled="true"
      :items="options"
    />
  </div>
  <Heading :level="2">
    Getting selected option
  </Heading>
  Selected option replaces default value and can be easily got from the same object:
  <div class="ex">
    <i>{{ currentItem }}</i>
  </div>
  <Heading
    :level="2"
  >
    Aligning
  </Heading>
  You can choose vertical aligning from <code>below</code> and <code>above</code> and horizontal aligning from <code>left</code> and <code>right</code>
  <div class="ex">
    <Select
      v-model="currentItem"
      :align="{vertically: 'below', horizontally: 'left'}"
      :is-disabled="false"
      :items="options"
    />
    <Select
      v-model="currentItem"
      :align="{vertically: 'below', horizontally: 'right'}"
      :is-disabled="false"
      :items="options"
    />
    <Select
      v-model="currentItem"
      :align="{vertically: 'above', horizontally: 'left'}"
      :is-disabled="false"
      :items="options"
    />
    <Select
      v-model="currentItem"
      :align="{vertically: 'above', horizontally: 'right'}"
      :is-disabled="false"
      :items="options"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { ContextMenuItem, Heading, Select } from '../../../src';
import { ref } from 'vue';

const currentItem = ref({
  title: 'Choose an option',
  onActivate: () => {},
});

const options: ContextMenuItem[] = [
  {
    type: 'default',
    title: 'Header',
    // eslint-disable-next-line no-console
    onActivate: console.log,
  },
  {
    title: 'Header 1',
    icon: 'H1',
    // eslint-disable-next-line no-console
    onActivate: console.log,
  },
  {
    type: 'default',
    title: 'Image',
    icon: 'Picture',
    // eslint-disable-next-line no-console
    onActivate: console.log,
  },
  {
    type: 'default',
    title: 'Text',
    icon: 'Text',
    // eslint-disable-next-line no-console
    onActivate: console.log,
  },
];
</script>

<style scoped>
.ex {
  display: grid;
  gap: var(--spacing-xl);
  margin: var(--spacing-xl) 0 var(--spacing-xxl);
  grid-template-columns: repeat(2, max-content);
  align-items: center;
}
</style>
