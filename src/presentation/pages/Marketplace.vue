<template>
  <div>
    <h1>{{ $t('marketplace.title') }}</h1>
    <h2>{{ $t('marketplace.listOfTools') }}</h2>
    <ul
      v-for="tool in tools"
      :key="tool.id"
    >
      <EditorToolElement :tool="tool" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import useMarketplace from '@/application/services/useMarketplace';
import EditorToolElement from '../components/marketplace/EditorToolElement.vue';

const { tools } = useMarketplace();
</script>

<style setup lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}
</style>
