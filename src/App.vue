<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Header from './presentation/components/Header.vue';
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

export default {
  name: "App",
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  #app {
    background-color: var(--background);
  }
</style>
