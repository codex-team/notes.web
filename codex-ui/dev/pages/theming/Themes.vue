<template>
  <PageHeader>
    Themes
    <template #description>
      There are many color themes available. Each of them can be used as for the Base colors and for the Accent colors.
    </template>
  </PageHeader>

  <template
    v-for="mode in ['Dark', 'Light']"
    :key="mode"
  >
    <Heading :level="2">
      {{ mode }} Mode
    </Heading>
    <div class="themes">
      <template
        v-for="theme in themes"
        :key="theme"
      >
        {{ theme }}

        <span
          v-for="color in colors"
          :key="color"
          class="color"
          :style="{
            backgroundColor: `var(${color})`,
            boxShadow: color === '--base--bg-primary' ? 'inset 0 0 0 1px var(--base--bg-secondary)' : 'none'
          }"
          :theme-base="theme.toLowerCase()"
          :color-scheme="mode.toLowerCase()"
        />
      </template>
    </div>
  </template>
</template>

<script setup lang="ts">
import { Heading } from '../../../src/vue';
import PageHeader from '../../components/PageHeader.vue';

const themes = [
  'Graphite',
  'Sky',
  'Grass',
  'Red',
  'Crimson',
  'Violet',
  'Amber',
  'Pure',
];

const colors = [
  '--base--bg-primary',
  '--base--bg-secondary',
  '--base--bg-secondary-hover',
  '--base--border',
  '--base--solid-secondary',
  '--base--solid-hover',
  '--base--solid',
  '--base--text-secondary',
  '--base--text',
  '--base--text-solid-foreground',
];
</script>

<style scoped>
.themes {
  display: grid;
  grid-template-columns: 150px repeat(v-bind(colors.length), auto);
  gap: var(--spacing-m);
  flex-direction: column;
  width: max-content;
  align-items: center;
  margin-bottom: var(--spacing-xxl);
}

.color {
  width: 48px;
  height: 38px;
  border-radius: var(--radius-field);
  display: block;
}
</style>
