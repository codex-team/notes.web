<template>
  <PageHeader>
    Popup
    <template #description>
      A component that appears on top of other components. Can include any other component.
    </template>
  </PageHeader>
  <Button
    secondary
    data-dimensions="large"
    @click="show()"
  >
    Press here to open popup
  </Button>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button, Confirm, usePopup } from '../../../src/vue';

function onCancelFunction(): void {
  // eslint-disable-next-line no-console
  console.log('The cancel button was pressed');
}

function onConfirmFunction(): void {
  // eslint-disable-next-line no-console
  console.log('The confirm button was pressed');
}

const { showPopup } = usePopup();

function show() {
  showPopup({
    component: Confirm,
    props: {
      title: 'CodeX',
      text: 'Are you sure you want to delete the page?',
      onCancel: onCancelFunction,
      onConfirm: onConfirmFunction,
    },
  });
}

</script>

<style scoped>
</style>
