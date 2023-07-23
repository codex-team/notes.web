<template>
  <Header />
  <component :is="layout || 'div'">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import Header from '@/presentation/components/Header.vue';
import { provide, shallowRef } from "vue"
import router from "./application/router";
import { layouts } from "./presentation/layouts";

const layout = shallowRef("div");

router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || "div";
});

provide("app:layout", layout);
</script>

<style lang="postcss">
html,
body {
  height: 100%;
}

#app {
  min-height: 100%;
  background: var(--color-bg);
  color: var(--color-text-main);
  word-break: break-word;
}
</style>
