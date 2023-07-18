<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import Header from './presentation/components/HeaderComponent.vue';
</script>

<style>
  * {
    box-sizing: border-box;
  }
</style>
