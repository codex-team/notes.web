<template>
  <PageHeader>
    Button
    <template #description>
      Clickable component for action or navigation
    </template>
  </PageHeader>
  <div class="buttons">
    <template
      v-for="(button, index) in buttons"
      :key="`button-${index}`"
    >
      <div class="buttons__label text-ui-footnote">
        {{ button[0] }} {{ button[1] }}
      </div>
      <Button
        :size="button[0] as ButtonSize"
        :style="button[1] as ButtonStyle"
        :disabled="button[1] === 'disabled'"
      >
        Button
      </Button>
    </template>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button, ButtonSize, ButtonStyle } from '../../../src/vue';

/**
 * Button samples in different states
 */
const buttons = [
  ['small'],
  ['small', 'secondary'],
  ['small', 'destructive'],
  ['small', 'disabled'],
  ['medium'],
  ['medium', 'secondary'],
  ['medium', 'destructive'],
  ['medium', 'disabled'],
  ['large'],
  ['large', 'secondary'],
  ['large', 'destructive'],
  ['large', 'disabled'],
];
</script>

<style scoped>
.buttons {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: repeat(2, max-content);

  &__label {
    margin-bottom: var(--spacing-xs);
  }
}
</style>
