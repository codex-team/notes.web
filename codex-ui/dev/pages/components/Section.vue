<template>
  <PageHeader>
    Form Section
    <template #description>
      A fragment of form with title, caption and a custom slot between them
    </template>
  </PageHeader>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Section } from '../../../src/vue';

</script>

<style scoped>
</style>
