<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style module lang="postcss">
.container {
  background-color: var(--base--bg-secondary);
  border-radius: var(--radius-field);
}
</style>
