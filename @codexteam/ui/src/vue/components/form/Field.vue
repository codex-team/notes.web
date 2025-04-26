<template>
  <Section
    :title="title"
    :caption="caption"
    :with-background="false"
  >
    <Input
      v-model="model"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
    />
  </Section>
</template>

<script setup lang="ts">
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
     * Whether the form field is disabled
     */
    disabled?: boolean;

    /**
     * Input value
     */
    value?: string;

    /**
     * Input placeholder
     */
    placeholder?: string;
  }>(),
  {
    caption: '',
    disabled: false,
    value: '',
    placeholder: '',
  }
);

const model = defineModel<string>();
</script>

<style module></style>
