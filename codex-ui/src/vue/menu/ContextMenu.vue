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
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="$style['context-menu__scrollable']"
    >
      <div :class="$style['context-menu__item']">
        <div :class="$style['context-menu__body']">
          <Icon :name="item.icon" />
          <div>
            {{ item.title }}
          </div>
        </div>
      </div>
      <div
        v-if="hasSeparator"
        :class="$style['context-menu__item']"
      >
        <div :class="$style['context-menu__sep-wrapper']">
          <div :class="$style['context-menu__separator']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../input/Input.vue';
import Icon from '../icon/Icon.vue';

interface Item {
  /**
   * Type of the item
   */
  type?: string;

  /**
   * Name of the item icon
   */
  icon: string;

  /**
   * Item title
   */
  title: string;

  /**
   * The function that is called when click
   */
  onActive: () => void;
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
    hasSeparator?: boolean;
  }>(),
  { showSearch: false }
);
</script>

<style module>
.context-menu {
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  display: grid;
  gap: var(--spacing-very-x);

  &__search {
    display: grid;
    gap: var(--spacing-very-x);
    width: max-content;
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
    width: max-content;
  }

  &__item {
    display: flex;
    gap: var(--v-padding);
    padding-top: var(--v-padding);
    padding-bottom: var(--v-padding);
    padding-left: var(--h-padding);
    padding-right: var(--h-padding);
  }

  &__body {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
  }
}
</style>
