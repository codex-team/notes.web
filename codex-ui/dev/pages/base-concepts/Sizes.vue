<template>
  <PageHeader>
    Sizes
    <template #description>
      All available size tokens for UI elements. All components uses only these sizes.
    </template>
  </PageHeader>

  <div class="grid">
    <template
      v-for="[size, value] in sizes"
      :key="size"
    >
      <code>{{ size }}</code>
      <span>{{ value }}px</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';

const sizes = [
  ['--spacing-very-x', 2],
  ['--spacing-xxs', 4],
  ['--spacing-xs', 6],
  ['--spacing-s', 8],
  ['--spacing-ms', 10],
  ['--spacing-m', 12],
  ['--spacing-ml', 16],
  ['--spacing-l', 20],
  ['--spacing-xl', 30],
  ['--spacing-xxl', 40],
  ['--size-icon', 20],
  ['--size-avatar', 30],
  ['--layout-content-width', 700],
  ['--delimiter-height', 1],
  ['--radius-s', 4],
  ['--radius-m', 8],
  ['--radius-ml', 12],
  ['--radius-l', 16],
];
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr repeat(1, auto);
  gap: var(--spacing-m) var(--spacing-xxl);
  flex-direction: column;
  width: max-content;
  align-items: center;
  margin-bottom: var(--spacing-xxl);
}
</style>
