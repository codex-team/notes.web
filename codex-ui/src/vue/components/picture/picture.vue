<template>
  <LightTheme v-if="name ==='LightTheme'" />
  <DarkTheme v-if="name ==='DarkTheme'" />
  <SystemTheme v-if="name ==='SystemTheme'" />
  <Hammer v-if="name ==='Hammer'" />
</template>

<script setup lang="ts">
import { LightTheme, DarkTheme, SystemTheme } from './assets';

defineProps<{
  /**
   * Name of the picture to be displayed
   */
  name: string;
}>();

</script>

<style lang="postcss" module></style>
