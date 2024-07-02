<template>
  <PageHeader>
    Color Scheme
    <template #description>
      All themes has two color schemes: light and dark
    </template>
  </PageHeader>
  <RadioGroup
    :values="[
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]"
    :value="colorScheme"
    name="color-scheme"
    @change="(event: Event) => setColorScheme((event.target as HTMLInputElement).value as ColorScheme)"
  />
</template>

<script setup lang="ts">
import { RadioGroup } from '../../../src/vue';
import { ColorScheme, useTheme } from '../../../src/vue/composables/useTheme';
import PageHeader from '../../components/PageHeader.vue';

const { colorScheme, setColorScheme } = useTheme();
</script>
