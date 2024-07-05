<template>
  <PageHeader>
    Popup
    <template #description>
      A component that appears on top of other components
    </template>
  </PageHeader>
  <Popup />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Popup } from '../../../src/vue';

</script>

<style scoped>
</style>
