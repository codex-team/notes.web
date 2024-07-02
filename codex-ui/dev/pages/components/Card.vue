<template>
  <PageHeader>
    Card
    <template #description>
      Display entity with a title, description, picture and actions
    </template>
  </PageHeader>

  <Heading :level="2">
    Horizontal card
  </Heading>

  <Card
    title="Card title"
    subtitle="Card description"
    orientation="horizontal"
    src="https://via.placeholder.com/150"
  />

  <Heading :level="2">
    Vertical card
  </Heading>

  <Card
    title="Card title"
    subtitle="Card description"
    orientation="vertical"
    src="https://via.placeholder.com/150"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Card, Heading } from '../../../src/vue';

</script>

<style scoped>
</style>
