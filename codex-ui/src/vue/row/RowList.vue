<template>
  <FormSection :title="listName">
    <ul
      v-for="item in items"
      :key="item.id"
    >
      <Row :title="item.name"></Row>
    </ul>
  </FormSection>
</template>

<script lang='ts' setup>
import Row from './Row.vue';
import FormSection from '../form/FormSection.vue';

export interface RowItem {
  id: number;
  name: string;
}

defineProps<{
  /**
   * The list name
   * Displayed above all listed items
   */
  listName: string;

  items: RowItem[];
}>();
</script>

<style module lang="postcss">

</style>
