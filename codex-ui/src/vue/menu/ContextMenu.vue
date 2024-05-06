<template>
  <div :class="$style['context-menu']">
    <div
      v-if="showSearch"
      :class="$style['context-menu__search']"
    >
      <Input :class="$style['context-menu-input']" />
      <div :class="$style['context-menu-wrapper']">
        <div :class="$style['context-menu-delimiter']"></div>
      </div>
    </div>
    <div :class="$style['context-menu-scrollable']">
      <div
        v-for="(item, index) in items"
        :key="index"
      >
        <div :class="$style['context-menu-wrapper']">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div
      v-if="hasDelimiter"
      :class="$style['context-menu-delimiter']"
    ></div>
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
  &__search {
    margin-bottom: var(--spacing-very-x);
  }

  &-scrollable {
    margin-bottom: var(--spacing-very-x);
  }

  &-wrapper {
    padding-left: var(--spacing-xxs);
    padding-right: var(--spacing-xxs);
    padding-bottom: var(--spacing-very-x);
    padding-top: var(--spacing-very-x);
  }

  &-delimiter {
    background: var(--base--border);
    align-self: stretch;
    height: var(--delimiter-height);
    flex-shrink: 0;
  }

  &-input {
    margin-bottom: var(--spacing-very-x);
  }
}
</style>
