<template>
  <PageHeader>
    Form Field
    <template #description>
      A part of the form with title, input and caption
    </template>
  </PageHeader>
  <div class="fields">
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="small"
      placeholder="Placeholder"
    />
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="medium"
      placeholder="Placeholder"
    />
    <Field
      v-model="formFieldValue"
      :value="formFieldValue"
      title="Title"
      caption="Will be visible in Tools list"
      size="large"
      placeholder="Placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Field } from '../../../src/vue';
import { ref } from 'vue';

const formFieldValue = ref('Heading');

</script>

<style scoped>
.fields {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: repeat(1, max-content);
}
</style>
