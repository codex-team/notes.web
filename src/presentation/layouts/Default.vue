<template>
  <div class="center-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .center-container {
    width: 100%;
    max-width: var(--layout-content-width);
    margin: 0 auto;
  }
</style>
