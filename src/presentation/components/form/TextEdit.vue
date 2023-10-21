<template>
  <div
    :title="title"
    class="text__edit"
  >
    <div
      v-if="title"
      class="field__text"
    >
      {{ title }}
    </div>
    <input
      v-model="value"
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="onChange"
    >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  /**
   * Title of the field
   */
  title: string;

  /**
   * Value of the field
   */
   value: string;

  /**
   * Variable Name
   */
  name: string;

   /**
    * Placeholder value
    */
   placeholder?: string;
}>();

const value = ref(props.value);

const emit = defineEmits([ 'update:value' ]);

const onChange = () => {
  emit('update:value', value);
};

</script>

<style lang="postcss">
@import '@/presentation/styles/typography.pcss';

.text__edit {
  @apply --text-small;

  padding: var(--spacing-xxs) var(--spacing-ms);
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;

  input {
    border: var(--spacing-very-x) var(--color-white) solid;
    background: var(--color-bg);
    color: var(--color-text-contrast);
    height: var(--size-icon);
    padding-left: var(--spacing-ms);
    text-decoration: none;
    border-radius: var(--spacing-xxs);
  }
}

</style>
