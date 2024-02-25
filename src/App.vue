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
import { onErrorCaptured } from 'vue';

useColorMode();

/**
 * All errors inside the application
 */
onErrorCaptured((error) => {
  console.error(error.message);
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
  background: var(--color-bg);
  color: var(--color-text-main);
  word-break: break-word;
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
