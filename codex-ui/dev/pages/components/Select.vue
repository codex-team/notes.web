<template>
  <PageHeader>
    Select
    <template #description>
      Component of the form that allows you to select one or more options from the list (currently one)
    </template>
  </PageHeader>
  <Select
    :items="options"
    :default-item="defaultItem"
    @value-update="(value) => updatedValue = value"
  />
  <Heading :level="3">
    Getting selected option
  </Heading>
  You can use selected item outside the component via <code>@value-update</code>: <i>{{ updatedValue }}</i>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { ContextMenuItem, DefaultItem, Heading, Select } from '../../../src';
import { ref } from 'vue';

const defaultItem: DefaultItem = {
  title: 'Choose an option',
  onActivate: () => {},
};
const updatedValue = ref<DefaultItem>(defaultItem);
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
</style>
