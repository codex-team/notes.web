<template>
  <div
    :title="title"
    :value="value"
    class="text__edit"
  >
    <div
      v-if="title"
      class="field__text"
    >
      {{ title }}
    </div>
    <input
      type="text"
      :name="name"
      :value="props.value"
      :placeholder="placeholder"
    >
    <slot />
  </div>
</template>

<script setup lang="ts">
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
