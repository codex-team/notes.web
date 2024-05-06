<template>
  <div :class="$style['context-menu']">
    <div
      v-if="showSearch"
      :class="$style['context-menu__search']"
    >
      <Input />
      <div :class="$style['context-menu__sep-wrapper']">
        <div :class="$style['context-menu__separator']" />
      </div>
    </div>
    <div :class="$style['context-menu__scrollable']">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="$style['context-menu__item']"
      >
        <div :class="$style['context-menu__body']">
          <div>
            {{ 'H1' }}
          </div>
          <div>
            {{ item.title }}
          </div>
        </div>
      </div>
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

  &__separator {
    background: var(--base--border);
    align-self: stretch;
    height: var(--delimiter-height);
  }

  &__sep-wrapper {
    padding-top: var(--spacing-very-x);
    padding-right: var(--spacing-xxs);
    padding-bottom: var(--spacing-very-x);
    padding-left: var(--spacing-xxs);
  }

  &__scrollable {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__item {
    display: flex;
    gap: var(--v-padding);
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 10px;
    padding-right: 10px;
  }

  &__body {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
  }
}
</style>
