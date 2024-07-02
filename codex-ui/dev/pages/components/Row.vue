<template>
  <PageHeader>
    Row
    <template #description>
      Universal component with horizontal alignment. Can be used in lists or standalone blocks.
    </template>
  </PageHeader>

  <Row
    title="Nickmel"
    subtitle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
    :has-delimiter="true"
  >
    <template #left>
      <Avatar
        src="https://i.pravatar.cc/50?u=1"
        username="Vitaly"
      />
    </template>

    <template #right>
      <Button
        secondary
      >
        Edit
      </Button>
    </template>
  </Row>

  <Row
    title="Vitaly"
    subtitle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
    label="Time Sensitive"
  >
    <template #left>
      <Avatar
        src="https://i.pravatar.cc/50?u=2"
        username="Vitaly"
      />
    </template>

    <template #right>
      <Button
        secondary
      >
        Edit
      </Button>
    </template>
  </Row>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Row, Avatar, Button } from '../../../src/vue';

</script>

<style scoped>
</style>
