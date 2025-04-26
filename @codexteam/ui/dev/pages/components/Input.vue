<template>
  <PageHeader>
    Input
    <template #description>
      A component for text input
    </template>
  </PageHeader>
  <div class="inputs">
    Default
    <Input />

    With placeholder
    <Input
      placeholder="Enter email"
    />

    With value
    <Input
      :value="value"
    />

    With icon
    <Input
      placeholder="Search"
      icon="Search"
    />
    Disabled
    <Input
      placeholder="Enter email"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
import { Input } from '../../../src/vue';

const value = ref('mail@example.com');
</script>

<style scoped>
.inputs {
  max-width: max-content;
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: auto repeat(1, max-content);
  align-items: center;
}
</style>
