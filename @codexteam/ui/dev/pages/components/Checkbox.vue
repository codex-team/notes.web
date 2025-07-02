<template>
  <PageHeader>
    Checkbox
    <template #description>
      This component has multiple states, useful for selecting options in various scenarios.
    </template>
  </PageHeader>
  <div class="preview-list">
    <div class="preview-item">
      <span class="preview-label">Checked</span>
      <Checkbox :checked="true" />
    </div>
    <div class="preview-item">
      <span class="preview-label">Unchecked</span>
      <Checkbox :checked="false" />
    </div>
    <div class="preview-item">
      <span class="preview-label">Disabled</span>
      <Checkbox
        :checked="false"
        disabled
      />
    </div>
    <div class="preview-item">
      <span class="preview-label">Disabled + Checked</span>
      <Checkbox
        :checked="true"
        disabled
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Checkbox } from '../../../src/vue';
</script>

<style scoped>
.preview-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.preview-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 240px;
}

.preview-label {
  font-size: 16px;
  color: #888;
}
</style>
