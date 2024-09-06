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
import { StubText, Button, usePopup } from '../../../src/vue';

const { showPopup } = usePopup();

function show(): void {
  showPopup({
    component: StubText,
    props: {},
  });
}

</script>

<style scoped>
</style>
