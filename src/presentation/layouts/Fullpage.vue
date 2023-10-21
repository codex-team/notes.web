<template>
  <div :class="$style.fullpage">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style module>
.fullpage {
  width: 100%;
  min-height: 100%;
  display: grid;
}
</style>
