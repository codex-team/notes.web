<template>
  <PageHeader>
    Theme preview
    <template #description>
      Component that shows color by theme's name
    </template>
  </PageHeader>

  <div class="grid-preview">
    <ThemePreview
      v-for="theme in themes"
      :key="theme"
      :theme="theme"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { ThemePreview, Theme } from '../../../src/vue';

/**
 * To make themes iterable
 */
const themes = Object.values(Theme);

</script>

<style scoped>
.grid-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}
</style>
