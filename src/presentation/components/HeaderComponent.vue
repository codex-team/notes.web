<template>
  <div class="header">
  </div>
</template>

<script lang="ts">
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>
  .header {
    height: 52px;
    padding: var(--spacing-ms) var(--spacing-l);
    background-color: var(--bg-color-header);
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>
