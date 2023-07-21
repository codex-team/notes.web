<template>
  <Header />
  <router-view></router-view>
</template>

<script lang="ts" setup>
import Header from '@/presentation/components/Header.vue';
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
