<template>
  <div id="app">
    <Header :tabs="tabs"/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import Header from './presentation/components/Header.vue';
import {IconPicture} from "@codexteam/icons";
const tabs = [
  {
    title: 'Home',
    path: '/',
    icon: IconPicture,
    isDefault: true,
    isActive: true,
  },
]
</script>

<style>
  * {
    box-sizing: border-box;
  }
</style>
