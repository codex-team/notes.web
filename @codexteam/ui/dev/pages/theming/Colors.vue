<template>
  <PageHeader>
    Colors
    <template #description>
      We have a set of colors that are used in the design system. You should use only these colors. All colors are attached to either Base or Accent use case.
    </template>
  </PageHeader>

  <Heading :level="2">
    Base use case
  </Heading>
  <div class="themes">
    <template
      v-for="[color, description] in colors"
      :key="color"
    >
      <code>--base{{ color }}</code>

      <span
        class="color"
        :style="{
          backgroundColor: `var(--base${color})`,
          boxShadow: color === '--bg-primary' ? 'inset 0 0 0 1px var(--base--bg-secondary)' : 'none'
        }"
      />

      {{ description }}
    </template>
  </div>

  <Heading :level="2">
    Accent use case
  </Heading>
  <div class="themes">
    <template
      v-for="[color] in colors"
      :key="color"
    >
      <code>--accent{{ color }}</code>

      <span
        class="color"
        :style="{
          backgroundColor: `var(--accent${color})`,
          boxShadow: color === '--bg-primary' ? 'inset 0 0 0 1px var(--base--bg-secondary)' : 'none'
        }"
      />

      <span />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Heading } from '../../../src/vue';
import PageHeader from '../../components/PageHeader.vue';

const colors = [
  ['--bg-primary', 'App background color'],
  ['--bg-secondary', 'Default background of UI elements'],
  ['--bg-secondary-hover', 'Hover for elements with bg-secondary'],
  ['--border', 'All lines color'],
  ['--solid-secondary', 'Active elements, highlights'],
  ['--solid-hover', 'Hover for active elements'],
  ['--solid', '“Soft” (translucent) active elements background'],
  ['--text-secondary', 'Low-contrast texts (aka “gray text”)'],
  ['--text', 'All UI texts color'],
  ['--text-solid-foreground', 'Texts on the elements filled with solid background'],
];
</script>

<style scoped>
.themes {
  display: grid;
  grid-template-columns: 1fr repeat(2, auto);
  gap: var(--spacing-m) var(--spacing-xxl);
  flex-direction: column;
  width: max-content;
  align-items: center;
  margin-bottom: var(--spacing-xxl);
}

.color {
  width: 40px;
  height: 30px;
  border-radius: var(--radius-field);
  display: block;
}
</style>
