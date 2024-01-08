<template>
  <Header />
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core';
import Header from '@/presentation/components/header/Header.vue';
import Layout from '@/presentation/layouts/Layout.vue';
import { onErrorCaptured, onMounted, watch } from 'vue';
import themeService from './application/services/themeService';

useColorMode();


// Watch for changes in the base and accent themes
watch(() => themeService.currentBaseTheme.value, () => {
  themeService.applyBaseTheme();
});

watch(() => themeService.currentAccentTheme.value, () => {
  themeService.applyAccentTheme();
});

/**
 * All errors inside the application
 */
onErrorCaptured((error) => {
  alert(error.message);
});

onMounted(() => {
  themeService.applyBaseTheme();
  themeService.applyAccentTheme();
});
</script>

<style lang="postcss">
html,
body {
  height: 100%;
  font-size: 16px;
  background-color: var(--base-bgPrimary);
  color: var(--accent-text);
}


button {
  color: var(--accent-text)
}
</style>
