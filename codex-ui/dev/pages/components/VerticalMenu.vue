<template>
  <PageHeader>
    Vertical Menu
    <template #description>
      A list of items that can be used for navigation or as a list of options
    </template>
  </PageHeader>

  If item has no <code>onActivate</code> property, it will be displayed as static item.

  <br>
  <br>

  <VerticalMenu :items="verticalMenuItems" />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { VerticalMenu, type VerticalMenuItem } from '../../../src/vue';

/**
 * Items for displaing in vertical menu
 */
const verticalMenuItems: VerticalMenuItem[] = [
  {
    title: 'CodeX',
    items: [
      {
        title: 'Workflow',
        // eslint-disable-next-line no-console
        onActivate: () => console.log('Workflow'),
      },
      {
        title: 'Enineering Strategy',
        // eslint-disable-next-line no-console
        onActivate: () => console.log('Enineering Strategy'),
        items: [
          {
            title: 'SSH Keys',
            isActive: true,
            // eslint-disable-next-line no-console
            onActivate: () => console.log('SSH Keys'),
          },
        ],
      },
      {
        title: 'Admission Campaign 2022',
        // eslint-disable-next-line no-console
        onActivate: () => console.log('Admission Campaign 2022'),
      },
    ],
  },
];
</script>

<style scoped>
</style>
