<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import HeaderComponent from './presentation/components/HeaderComponent.vue';
export default {
  name: "App",
  components: {HeaderComponent},
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
</style>
