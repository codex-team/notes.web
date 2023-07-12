<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
  emitAuto: true
})

export default {
  name: "App",
}
</script>

<style scoped>
  @import "./presentation/styles/colors.pcss";
  @import "./presentation/styles/global.pcss";

  #app {
    background-color: var(--background);
  }
</style>