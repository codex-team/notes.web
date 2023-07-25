<template>
  <div :is="layout" class="center-container">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "Default",
}
</script>

<style scoped>
  .center-container {
    display: flex;
    justify-content: center;
  }
</style>