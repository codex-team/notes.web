<template>
  <FormSection :title="listName">
    <slot></slot>
  </FormSection>
</template>

<script lang='ts' setup>
import FormSection from '../form/FormSection.vue';

defineProps<{
  /**
   * The list name
   * Displayed above all listed items
   */
  listName: string;
}>();
</script>

<style module lang="postcss">

</style>
../form-section/FormSection.vue