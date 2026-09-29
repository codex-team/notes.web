<template>
  <PageBlock data-dimensions="large">
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
import { VerticalMenu, type VerticalMenuItem, PageBlock } from '@codexteam/ui/vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const verticalMenuItems = computed<VerticalMenuItem[]>(() => [
  {
    title: t('marketplace.listOfTools'),
    isActive: route.path === '/marketplace',
    onActivate: () => router.push('/marketplace'),
  },
  {
    title: t('marketplace.addTool'),
    isActive: route.path === '/marketplace/add',
    onActivate: () => router.push('/marketplace/add'),
  },
]);
</script>

<style scoped>
.menu {
  position: sticky;
  top: calc(var(--layout-navbar-height) + var(--spacing-xxl));
  height: fit-content;
  width: auto;
}
</style>
