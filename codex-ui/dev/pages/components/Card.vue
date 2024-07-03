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
  >
    <Button icon="Plus"/>
  </Card>

  <Heading :level="2">
    Vertical card
  </Heading>

  <Card
    title="Card title"
    subtitle="Card description"
    orientation="vertical"
    src="https://via.placeholder.com/150"
  >
    <Button icon="Plus"/>
  </Card>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Card, Heading, Button } from '../../../src/vue';

</script>

<style scoped>
</style>
