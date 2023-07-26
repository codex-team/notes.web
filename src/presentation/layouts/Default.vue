<template>
  <div :is="layout" class="center-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .center-container {
    display: flex;
    justify-content: center;
  }
</style>