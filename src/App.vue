<template>
  <Header />
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core';
import Header from '@/presentation/components/Header.vue';
import Layout from '@/presentation/layouts/Layout.vue';

useColorMode();
</script>

<style lang="postcss">
html,
body {
  height: 100%;
  font-family: 'Source Sans Pro', sans-serif;
}

#app {
  min-height: 100%;
  background: var(--color-bg);
  color: var(--color-text-main);
  word-break: break-word;
}
</style>
