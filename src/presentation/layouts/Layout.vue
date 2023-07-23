<template>
  <component :is="layout || DefaultLayout">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { provide } from "vue";
import DefaultLayout from "./DefaultLayout.vue";
import useLayout from '@/application/services/useLayout';

const layout = useLayout();
provide("app:layout", layout);
</script>

<style lang="postcss">
</style>
