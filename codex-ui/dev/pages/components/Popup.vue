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
        right-button="Confirm"
        :on-left-activate="onLeftFunction"
        :on-right-activate="onRightFunction"
      />
    </template>
  </Popup>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Popup, Button, Confirm } from '../../../src/vue';

function onLeftFunction(): void {
  // eslint-disable-next-line no-console
  console.log('The left button was pressed');
}

function onRightFunction(): void {
  // eslint-disable-next-line no-console
  console.log('The right button was pressed');
}

</script>

<style scoped>
</style>
