<template>
  <div id="app">
    <HeaderLayout />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import HeaderLayout from "./presentation/layout/HeaderLayout.vue";
export default {
  name: "App",
  components: {HeaderLayout},
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
</style>
