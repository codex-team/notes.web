<template>
  <fieldset :class="$style['radio-group']">
    <Radio
      v-for="(item, index) in values"
      :key="index"
      v-model="model"
      :value="item.value"
      :name="name"
    >
      {{ item.label }}
    </Radio>
  </fieldset>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Radio from './Radio.vue';
import { RadioGroupItem } from './Radio.types';

defineProps<{
  /**
   * The values of the radio group
   */
  values: RadioGroupItem[];

  /**
   * The name of input that will be submitted
   */
  name?: string;
}>();

const model = defineModel();
</script>

<style lang="postcss" module>
.radio-group {
  border: 0;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
