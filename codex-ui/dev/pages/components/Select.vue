<template>
  <PageHeader>
    Select
    <template #description>
      Component of the form that allows you to select one or more options from the list
    </template>
  </PageHeader>
  <Dropdown :items="dropdownItems" />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { ContextMenuItem, Dropdown } from '../../../src';

const dropdownItems: ContextMenuItem[] = [
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
    type: 'separator',
  },
  {
    type: 'default',
    title: 'Image',
    icon: 'Picture',
    // eslint-disable-next-line no-console
    onActivate: console.log,
  },
  {
    type: 'separator',
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
