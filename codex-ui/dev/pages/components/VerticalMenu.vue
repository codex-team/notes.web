<template>
  <PageHeader>
    Vertical Menu
    <template #description>
      A list of items that can be used for navigation or as a list of options
    </template>
  </PageHeader>

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

<style scoped>
</style>
