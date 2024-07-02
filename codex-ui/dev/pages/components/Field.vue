<template>
  <PageHeader>
    Form Field
    <template #description>
      A part of the form with title, input and caption
    </template>
  </PageHeader>

  Form Field is actually a compbination of Section and Input components
  <br>
  <br>

  <Field
    v-model="formFieldValue"
    :value="formFieldValue"
    title="Title"
    caption="Will be visible in Tools list"
    placeholder="Placeholder"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Field } from '../../../src/vue';
import { ref } from 'vue';

const formFieldValue = ref('Heading');

</script>

<style scoped>
</style>
