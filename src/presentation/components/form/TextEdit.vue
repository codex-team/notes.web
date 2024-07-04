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
      :value="value"
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="onChange"
    >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
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

const emit = defineEmits(['update:value']);

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emit('update:value', target.value);
};
</script>

<style lang="postcss">
.text__edit {
  padding: var(--spacing-xxs) var(--spacing-ms);
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;

  input {
    border: var(--spacing-very-x) var(--color-white) solid;
    background: var(--base--bg-secondary);
    color: var(--accent--text);
    height: var(--size-icon);
    padding-left: var(--spacing-ms);
    text-decoration: none;
    border-radius: var(--spacing-xxs);
  }
}
</style>
