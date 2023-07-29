<template>
  <Header />
  <a
    :href="loginUrl"
  >
    Login
  </a>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core';
import Header from '@/presentation/components/header/Header.vue';
import Layout from '@/presentation/layouts/Layout.vue';

useColorMode();

const loginUrl = import.meta.env.VITE_GOOGLE_OAUTH_URL as string;
</script>

<style lang="postcss">
html,
body {
  height: 100%;
}

#app {
  min-height: 100%;
  background: var(--color-bg);
  color: var(--color-text-main);
  word-break: break-word;
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
