<template>
  <PageHeader>
    Form Section
    <template #description>
      A fragment of form with title, caption and a custom slot between them
    </template>
  </PageHeader>

  <Heading :level="2">
    Section without slot
  </Heading>

  <Section
    title="List Name"
    caption="Item list"
  />

  <Heading :level="2">
    Section with a Row as a slot
  </Heading>

  <Section
    title="List Name"
    caption="Item list"
  >
    <Row
      v-for="(item, index) in formSectionItems"
      :key="item.id"
      :title="item.name"
      :has-delimiter="index !== formSectionItems.length - 1"
    >
      <template #left>
        <Avatar
          src="../static/example-avatar.png"
          :username="item.name"
        />
      </template>

      <template #right>
        <Button
          size="small"
          :style="'secondary'"
        >
          Can View
        </Button>
      </template>
    </Row>
  </Section>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Section, Avatar, Button, Row, Heading } from '../../../src/vue';

/**
 * Form section items elements
 */
const formSectionItems = [
  { id: 1,
    name: 'Vitaly' },
  { id: 2,
    name: 'Nickmel' },
];

</script>

<style scoped>
</style>
