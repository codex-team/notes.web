<template>
  <PageHeader>
    Popup with Confirm
    <template #description>
      A component that appears on top of other components
    </template>
  </PageHeader>
  <Popup>
    <template #trigger>
      <Button
        secondary
        data-dimensions="large"
      >
        Press here to open popup
      </Button>
    </template>
    <template #content>
      <Confirm
        title="CodeX"
        body="Are you sure you want to delete the page?"
        left-button="Button"
        right-button="Confirm"
      />
    </template>
  </Popup>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Popup, Button, Confirm } from '../../../src/vue';

</script>

<style scoped>
</style>
