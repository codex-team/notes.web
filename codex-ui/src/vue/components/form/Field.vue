<template>
  <Section
    :title="title"
    :caption="caption"
    :size="size"
    :with-background="false"
  >
    <Input
      v-model="model"
      :size="size"
      :disabled="disabled"
      :value="value"
    />
  </Section>
</template>

<script setup lang="ts">
import { FieldSize } from './Section.types';
import Input from '../input/Input.vue';
import { defineModel } from 'vue';
import Section from './Section.vue';
withDefaults(
  defineProps<{
    /**
     * Form field title
     * Will be displayed as a heading
     */
    title: string;

    /**
     * Additional description of the embedded field
     */
    caption?: string;

    /**
     * The size of the form field and input
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
    caption: '',
    size: 'medium',
    disabled: false,
    value: '',
  }
);

const model = defineModel();
</script>

<style module></style>
