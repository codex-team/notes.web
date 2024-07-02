<template>
  <PageHeader>
    Base and Accent
    <template #description>
      We have several themes. Each of them can be used as a Base or Accent use case. Base use case is used for the main background and text colors. Accent use case is used for the accent colors like primary buttons, highlights, etc.
    </template>
  </PageHeader>
  <Heading :level="2">
    Base Theme
  </Heading>
  <RadioGroup
    name="base-theme"
    :value="themeBase"
    :values="[
      { label: 'Classic', value: 'classic' },
      { label: 'Crimson', value: 'crimson' },
      { label: 'Red', value: 'red' },
      { label: 'Violet', value: 'violet' },
    ]"
    @change="(event: Event) => setBaseTheme((event.target as HTMLInputElement).value as Theme)"
  />

  <Heading :level="2">
    Accent Theme
  </Heading>
  <RadioGroup
    name="accent-theme"
    :value="themeAccent"
    :values="[
      { label: 'Classic', value: 'classic' },
      { label: 'Crimson', value: 'crimson' },
      { label: 'Red', value: 'red' },
      { label: 'Violet', value: 'violet' },
    ]"
    @change="(event: Event) => setAccentTheme((event.target as HTMLInputElement).value as Theme)"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { RadioGroup, Heading } from '../../../src/vue';
import { type Theme, useTheme } from '../../../src/vue/composables/useTheme';

const { themeBase, themeAccent, setBaseTheme, setAccentTheme } = useTheme();
</script>
