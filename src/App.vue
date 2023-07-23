<template>
  <Header />
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts" setup>
import Header from '@/presentation/components/Header.vue';
import useLayout from '@/application/services/useLayout';
import Layout from "@/presentation/layouts/Layout.vue"
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
}
</style>
