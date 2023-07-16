<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
  initialValue: "dark"
})

export default {
  name: "App",
}
</script>

<style scoped>
  @import "./presentation/styles/colors.pcss";

  #app {
    background-color: var(--background);
  }
</style>