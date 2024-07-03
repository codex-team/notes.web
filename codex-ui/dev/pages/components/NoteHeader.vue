<template>
  <PageHeader>
    Note Header
    <template #description>
      Header of the note page
    </template>
  </PageHeader>

  <NoteHeader
    description="Last edit"
    last-update="Jul 2, 21:45"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { NoteHeader } from '../../../src/vue';

</script>

<style scoped>
</style>
