<template>
  <PageHeader>
    Container
    <template #description>
      Universal holder for content. Can be used for displaing any content on the "island".
    </template>
  </PageHeader>

  <Container>
    <br>
    &nbsp; &lt;- Any content here -&gt;
    <br>
    <br>
  </Container>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Container } from '../../../src/vue';

</script>

<style scoped>
</style>
