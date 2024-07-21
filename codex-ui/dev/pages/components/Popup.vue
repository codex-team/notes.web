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
import { Button, Confirm, usePopup, useConfirm } from '../../../src/vue';

const { showPopup } = usePopup();
const { confirm } = useConfirm();

confirm('Are you sure you want to delete the page?');

function show() {
  showPopup({
    component: Confirm,
    props: {
      title: 'CodeX',
      text: 'Are you sure you want to delete the page?',
    },
  });
}

</script>

<style scoped>
</style>
