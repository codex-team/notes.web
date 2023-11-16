<template>
  <div>
    <h1>{{ $t('marketplace.title') }}</h1>
    <h2>{{ $t('marketplace.listOfTools') }}</h2>
    <ul
      v-for="tool in tools"
      :key="tool.id"
    >
      <li>
        {{ tool.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useEditorTools  from '@/application/services/useEditorTool';

const { tools } = useEditorTools();
</script>

<style setup lang = "postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
    @apply --text-heading-1;
}
</style>
