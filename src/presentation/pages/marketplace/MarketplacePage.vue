<template>
  <PageBlock>
    <template #left>
      <VerticalMenu
        class="menu"
        :items="verticalMenuItems"
      />
    </template>
    <template #default>
      <router-view />
    </template>
  </PageBlock>
</template>

<script lang="ts" setup>
import { VerticalMenu, type VerticalMenuItem, PageBlock } from 'codex-ui/vue';
import { computed, Ref } from 'vue';
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
  width: auto;
}
</style>
