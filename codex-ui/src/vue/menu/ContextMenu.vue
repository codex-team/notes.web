<template>
  <div :class="$style['context-menu']">
    <div
      v-if="showSearch"
      :class="$style['context-menu__search']"
    >
      <Input />
      <div :class="$style['context-menu__delimiter']" />
    </div>
    <div>
      {{ 'Hello' }}
    </div>
    <div>
      {{ 'World' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../input/Input.vue';

interface Item {
  /**
   * Item id
   */
  id: number;

  /**
   * Item title
   */
  title: string;
}

withDefaults(
  defineProps<{
    /**
     * If true, displays the input field for the search
     */
    showSearch?: boolean;

    /**
     * Array of items for context menu
     */
    items: Item[];

    /**
     * True if context menu should contain delimiter
     */
    hasDelimiter?: boolean;
  }>(),
  { showSearch: false }
);
</script>

<style module>
.context-menu {
  display: grid;
  gap: var(--spacing-very-x);

  &__search {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__delimiter {
    background: var(--base--border);
    align-self: stretch;
    height: var(--delimiter-height);
  }
}
</style>
