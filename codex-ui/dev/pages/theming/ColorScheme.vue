<template>
  <Heading :level="1">
    Color Scheme
  </Heading>
  <RadioGroup
    :values="[
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]"
    :value="colorScheme"
    name="color-scheme"
    @change="($event) => setColorScheme($event.target.value)"
  />
</template>

<script setup lang="ts">
import { Heading } from '../../../src/vue';
</script>
