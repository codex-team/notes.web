<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

export default {
  name: "App",
}
</script>

<style scoped>
  #app {
    background-color: var(--background);
  }
</style>