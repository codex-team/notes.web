<template>
  <PageHeader>
    Popup
    <template #description>
      A component that appears on top of other components
    </template>
  </PageHeader>
  <Popup>
    <template #trigger>
      <Button secondary>
        Popup
      </Button>
    </template>
    <template #content>
      <div>
        Hello World!
      </div>
      <div>
        Hello World!
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Popup, Button } from '../../../src/vue';

</script>

<style scoped>
</style>
