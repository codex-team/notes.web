<template>
  <PageHeader>
    Editor
    <template #description>
      Component for creating a rich text content using Editor.js
    </template>
  </PageHeader>

  <Editor :tools="{}" />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Editor } from '../../../src/vue';

</script>

<style scoped>
</style>
