<template>
  <PageHeader>
    PageBlock
    <template #description>
      PageBlock is a page unit with three slots: left, right, and center content. By default, the content has a fixed width of 700px. When stretched is true, the content adapts to the screen size.
    </template>
  </PageHeader>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
</script>
