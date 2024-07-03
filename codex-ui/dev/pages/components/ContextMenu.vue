<template>
  <PageHeader>
    Context Menu
    <template #description>
      Vertical menu that appears when you click on the element. Usually inserted as a slot in the Popover component.
    </template>
  </PageHeader>

  <ContextMenu
    :show-search="true"
    :items="contextMenuItems"
    :message="'Nothing found'"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { ContextMenu, ContextMenuItem } from '../../../src/vue';

/**
 * Items for searching in the context menu
 */
const contextMenuItems: ContextMenuItem[] = [
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
