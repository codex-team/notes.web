<template>
  <div class="center-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .center-container {
    padding: 100px 0;
    width: 100%;
    max-width: var(--layout-content-width);
    margin: 0 auto;
  }
</style>
