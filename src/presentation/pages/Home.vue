<script lang="ts" setup>
</script>

<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>
  </div>
</template>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
