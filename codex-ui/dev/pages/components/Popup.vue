<template>
  <PageHeader>
    Popup
    <template #description>
      A component that appears on top of other components. Can include any other component.
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
        confirm-button="Confirm"
        :on-cancel="onCancelFunction"
        :on-confirm="onConfirmFunction"
      />
    </template>
  </Popup>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Popup, Button, Confirm } from '../../../src/vue';

function onCancelFunction(): void {
  // eslint-disable-next-line no-console
  console.log('The cancel button was pressed');
}

function onConfirmFunction(): void {
  // eslint-disable-next-line no-console
  console.log('The confirm button was pressed');
}

</script>

<style scoped>
</style>
