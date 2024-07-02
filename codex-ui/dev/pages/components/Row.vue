<template>
  <PageHeader>
    Row
    <template #description>
      Universal component with horizontal alignment. Can be used in lists or standalone blocks.
    </template>
  </PageHeader>

  <Row
    title="Title"
    subtle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
    :has-delimiter="true"
  >
    <template #left>
      <Avatar
        src="../static/example-avatar.png"
        username="Vitaly"
      />
    </template>

    <template #right>
      <Button
        size="small"
        :style="'secondary'"
      >
        Edit
      </Button>
    </template>
  </Row>

  <Row
    title="Title"
    subtle="This item is no longer detected near you. It was last seen near Pesochnaya Embankment, 14 литТ к2."
    label="Time Sensitive"
  >
    <template #left>
      <Avatar
        src="../static/example-avatar.png"
        username="Vitaly"
      />
    </template>

    <template #right>
      <Button
        size="small"
        :style="'secondary'"
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
