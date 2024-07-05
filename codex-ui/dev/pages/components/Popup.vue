<template>
  <PageHeader>
    Popup
    <template #description>
      A component that appears on top of other components
    </template>
  </PageHeader>
  <Button secondary>
    Popup
  </Button>
  <Popup>
    Hello World!
  </Popup>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Popup, Button } from '../../../src/vue';

</script>

<style scoped>
</style>
