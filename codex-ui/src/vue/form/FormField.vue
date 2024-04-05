<template>
  <FormSection
    :title="title"
    :size="size"
  >
    <Input
      v-model="model"
      :size="size"
      :disabled="disabled"
      :value="value"
    />
  </FormSection>
</template>

<script setup lang="ts">
import { FieldSize } from './FormSection.types';
import Input from '../input/Input.vue';
import FormSection from './FormSection.vue';
withDefaults(
  defineProps<{
    /**
     * Form section title
     * Will be displayed as a heading
     */
    title: string;

    /**
     * The size of the form section
     */
    size?: FieldSize;

    /**
     * Whether the form field is disabled
     */
    disabled?: boolean;

    /**
     * Input value
     */
    value?: string;
  }>(),
  {
    size: 'medium',
    disabled: false,
    value: '',
  }
);

const model = defineModel();
</script>

<style module>

</style>