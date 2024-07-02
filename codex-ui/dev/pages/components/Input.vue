<template>
  <PageHeader>
    Input
    <template #description>
      A component for text input
    </template>
  </PageHeader>
  <div class="inputs">
    <Input
      placeholder="Enter email"
      size="small"
    />
    <Input
      placeholder="Enter email"
      size="medium"
    />
    <Input
      placeholder="Enter email"
      size="large"
    />
    <Input
      placeholder="Enter email"
      size="large"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Input } from '../../../src/vue';

</script>

<style scoped>
.inputs {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: repeat(1, max-content);
}
</style>
