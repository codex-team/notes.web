<template>
  <PageHeader>
    Color sheme icons
    <template #description>
      Components that will display icons representing some of color shemes
    </template>
  </PageHeader>

  <div
    :class="$style['pictures']"
  >
    <LightColorShemeIcon />
    <DarkColorShemeIcon />
    <SystemColorShemeIcon />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { LightColorShemeIcon, DarkColorShemeIcon, SystemColorShemeIcon } from '../../../src/vue';

</script>

<style lang="postcss" module>
.pictures {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 1rem;
}
</style>
