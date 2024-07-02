<template>
  <PageHeader>
    Note Header
    <template #description>
      Header of the note page
    </template>
  </PageHeader>

  <NoteHeader />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { NoteHeader } from '../../../src/vue';

</script>

<style scoped>
</style>
