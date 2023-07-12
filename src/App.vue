<script setup lang="ts">
import { provide, shallowRef } from "vue"
import router from "./application/router";
import { layouts } from "./presentation/layouts";

const layout = shallowRef("div");

router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || "div";
});

provide("app:layout", layout);

</script>

<template>
  <div id="app">
    <component :is="layout || 'div'">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
}
</script>

<style scoped>

</style>