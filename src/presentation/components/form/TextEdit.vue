<template>
  <div
    :title="title"
    class="text__edit"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="title"
      class="field__text"
    >
      {{ title }}
    </div>
    <input type="text" :name=name :placeholder=placeholder>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  /**
   * Title of the field
   */
  title: string;

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
    border: 1px #fff solid;
    background: var(--color-bg);
    color: var(--color-text-contrast);
    height: 28px;
    padding-left: 10px;
    text-decoration: none;
    background-repeat: repeat-x;
    border-radius: 5px;
  }
}

</style>
