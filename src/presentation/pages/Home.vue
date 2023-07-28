<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page content.</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
