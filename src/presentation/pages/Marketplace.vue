<template>
  <h1>{{ $t('marketplace.title') }}</h1>
  <h2>{{ $t('marketplace.listOfTools') }}</h2>
  <ul
    v-for="tool in editorTools"
    :key="tool.id"
  >
    <li>
      {{ tool.name }}
    </li>
  </ul>
</template>

<script lang = "ts" setup>
import { useAppState } from '@/application/services/useAppState';

const { editorTools } = useAppState();
</script>

<style setup lang = "postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
    @apply --text-heading-1;
}
</style>