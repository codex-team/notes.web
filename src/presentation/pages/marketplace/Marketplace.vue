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
    <Button
      link="/marketplace/add"
      :text="$t('marketplace.addTool')"
    />
  </div>
</template>

<script setup lang="ts">
import useMarketplace from '@/application/services/useMarketplace';
import EditorToolElement from '@/presentation/components/marketplace/EditorToolElement.vue';
import Button from '@/presentation/components/button/Button.vue';

const { tools } = useMarketplace();
</script>

<style setup lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}
</style>
