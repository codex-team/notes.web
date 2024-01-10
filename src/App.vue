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
import { onErrorCaptured, watch, computed, onMounted } from 'vue';
import themeService from './application/services/themeService';


useColorMode();

/**
 * Get the current theme
 */
const theme = computed(() => themeService.currentBaseTheme.value);

watch(theme, (newTheme) => {
  document.getElementById('app')?.style.setProperty('background-color', `var(--base-${newTheme.toLowerCase()}-bgPrimary)`);
  document.getElementById('app')?.style.setProperty('color', `var(--base-${newTheme.toLowerCase()}-text)`);
  document.querySelector('p')?.style.setProperty('color', `var(--base-${newTheme.toLowerCase()}-textSecondary)`);
});
onErrorCaptured((error) => {
  alert(error.message);
});

onMounted(() => {
  document.getElementById('app')?.style.setProperty('background-color', `var(--base-${theme.value.toLowerCase()}-bgPrimary)`);
  document.getElementById('app')?.style.setProperty('color', `var(--base-${theme.value.toLowerCase()}-text)`);
  document.querySelector('p')?.style.setProperty('color', `var(--base-${theme.value.toLowerCase()}-textSecondary)`);
});
</script>

<style lang="postcss">
html,
body {
  height: 100%;
  font-size: 16px;

}


#app {
  min-height: 100%;
  background-color: var(--color-bg);
  color: var(--color-text-main);
  word-break: break-word;
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
