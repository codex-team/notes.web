<template>
  <PageHeader>
    Confirm
    <template #description>
      A component that allows you to accept or reject a message that appears
    </template>
  </PageHeader>
  <Button
    secondary
    data-dimensions="large"
    @click="show()"
  >
    Press here to open confirm window
  </Button>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button, useConfirm } from '../../../src/vue';

const { confirm } = useConfirm();

async function show() {
  const res = await confirm(
    'CodeX',
    'Are you sure you want to delete the page?'
  );

  if (res) {
    // eslint-disable-next-line no-console
    console.log('The confirm button was pressed');
  } else {
    // eslint-disable-next-line no-console
    console.log('The cancel button was pressed');
  }
}

</script>

<style scoped>
</style>
