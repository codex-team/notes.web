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
import { onErrorCaptured, computed, watch, onMounted } from 'vue';
import themeService from './application/services/themeService';


useColorMode();

/**
 * Get the current theme
 */
const currentBaseTheme = computed(() => themeService.currentBaseTheme.value);
const currentAccentTheme = computed(() => themeService.currentAccentTheme.value);

onErrorCaptured((error) => {
  alert(error.message);
});

watch([currentBaseTheme, currentAccentTheme], ([baseTheme, accentTheme]) => {
  const rootElement = document.querySelector('#app');

  if (rootElement) {
    // Remove old theme classes
    const themeClasses = Array.from(rootElement.classList).filter(
      (className) => className.startsWith('theme-')
    );

    rootElement.classList.remove(...themeClasses);

    // Add new theme classes
    rootElement.classList.add(baseTheme, accentTheme);
  }
});

onMounted(() => {
  const rootElement = document.querySelector('#app');

  if (rootElement) {
    // Remove old theme classes
    const themeClasses = Array.from(rootElement.classList).filter(
      (className) => className.startsWith('theme-')

    );

    rootElement.classList.remove(...themeClasses);

    // Add new theme classes
    rootElement.classList.add(currentBaseTheme.value, currentAccentTheme.value);
  }
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
  background-color: var(--bg-primary-base);
  word-break: break-word;
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr;
}

#app p {
  color: var(--text-secondary-base)
}

#app h1,h2,h3,h4,h5,h6 {
  color: var(--text-base)
}


</style>
