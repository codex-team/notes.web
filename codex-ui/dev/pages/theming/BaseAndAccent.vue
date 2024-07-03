<template>
  <PageHeader>
    Base and Accent
    <template #description>
      We have several themes. Each of them can be used as a Base or Accent use case. Base use case is used for the main background and text colors. Accent use case is used for the accent colors like primary buttons, highlights, etc.
    </template>
  </PageHeader>

  <ThemePicker
    title="Base Theme"
    theme-type="Base"
  />
  <ThemePicker
    title="Accent Theme"
    theme-type="Accent"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { ThemePicker } from '../../../src/vue';

</script>

<style scoped>
</style>
