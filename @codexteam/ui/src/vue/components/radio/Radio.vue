<template>
  <div>
    <input
      :id="id"
      v-model="model"
      type="radio"
      :value="value"
      :checked="checked"
      :name="name"
    >
    <label
      v-if="$slots.default"
      :for="id"
    >
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  /**
   * The value of the radio
   */
  value: string;

  /**
   * The name of the radio
   */
  name?: string;

  /**
   * Is radio checked
   */
  checked: boolean;
}>();

/**
 * Unique identifier used to link the radio input and label
 */
const id = computed(() => `radio-${props.name ?? 'unknown'}-${props.value}`);

const model = defineModel<string>();
</script>
