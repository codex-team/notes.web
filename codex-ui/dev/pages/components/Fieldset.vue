<template>
  <PageHeader>
    Form Fieldset
    <template #description>
      One or more fields grouped together with a title
    </template>
  </PageHeader>
  <Fieldset
    title="Fieldset title"
  >
    <div>
      <Section title="section title">
        <Row
          label="label"
          title="actual row title"
          subtle="subtle"
        >
          <template #right>
            <Button icon="Plus" />
          </template>
        </Row>
      </Section>
      <Section title="section title">
        <Row
          label="label"
          title="actual row title"
          subtle="subtle"
        >
          <template #right>
            <Button icon="Plus" />
          </template>
        </Row>
      </Section>
      <Button>
        button
      </Button>
    </div>
  </Fieldset>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Fieldset, Section, Row, Button } from '../../../src/vue';

</script>

<style scoped>
</style>
