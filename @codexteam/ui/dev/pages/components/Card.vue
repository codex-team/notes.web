<template>
  <PageHeader>
    Card
    <template #description>
      Display entity with a title, description, picture and actions
    </template>
  </PageHeader>

  <Heading :level="2">
    Orientation
  </Heading>

  <Heading :level="3">
    Horizontal
  </Heading>

  <Card
    title="Card title"
    subtitle="Card description"
    orientation="horizontal"
    src="https://via.placeholder.com/150"
  >
    <Button icon="Plus" />
  </Card>

  <Heading :level="3">
    Vertical
  </Heading>

  <Card
    title="Card title"
    subtitle="Card description"
    orientation="vertical"
    src="https://via.placeholder.com/150"
  >
    <Button icon="Plus" />
  </Card>

  <br>
  <br>
  <Heading :level="1">
    Card Skeleton
  </Heading>
  <br>
  <br>

  <CardSkeleton orientation="horizontal" />

  <br>
  <br>
  <CardSkeleton orientation="vertical" />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Card, CardSkeleton, Heading, Button } from '../../../src/vue';

</script>

<style scoped>
</style>
