<template>
  <div>
    <h1>Marketplace</h1>
    <h2>Tools</h2>
    <ul
      v-for="tool in allEditorTools"
      :key="tool.id"
    >
      <li>
        {{ tool.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAppState } from '@/application/services/useAppState';

const { allEditorTools } = useAppState();
console.log(allEditorTools);
</script>

<style setup lang = "postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
    @apply --text-heading-1;
}
</style>
