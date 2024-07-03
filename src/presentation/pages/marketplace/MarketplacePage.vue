<template>
  <DefaultLayout>
    <template #block-left>
      <VerticalMenu

        class="menu"
        :items="verticalMenuItems"
      />
    </template>
    <template #default>
      <Marketplace v-if="route.path === '/marketplace'" />
      <AddTool v-if="route.path === '/marketplace/add'" />
    </template>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { VerticalMenu, type VerticalMenuItem } from 'codex-ui/vue';
import Marketplace from './Marketplace.vue';
import AddTool from './AddTool.vue';
import { computed, Ref } from 'vue';
import DefaultLayout from '../../layouts/Default.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

/**
 * Items for displaing in vertical menu
 */
const verticalMenuItems: Ref<VerticalMenuItem[]> = computed(() => [

  {
    title: 'Tools',
    isActive: route.path === '/marketplace',
    onActivate: () => router.push('/marketplace'),
  },
  {
    title: 'Add your own tool',
    isActive: route.path === '/marketplace/add',
    onActivate: () => router.push('/marketplace/add'),
  },
]);
</script>

<style setup lang="postcss" scoped>
.page {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xxl);
}

.menu {
  flex-shrink: 0;
  height: fit-content;
}
</style>
