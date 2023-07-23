<template>
  <Header />
  <router-view></router-view>
</template>

<script lang="ts">
import Header from '@/presentation/components/Header.vue';
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

export default {
  name: "App",
}
</script>

<style scoped>
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
