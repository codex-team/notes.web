<template>
  <div
    ref="contextMenu"
    :class="$style['context-menu']"
  >
    <div
      v-if="showSearch"
      :class="$style['context-menu__search']"
    >
      <Input
        v-model="searchTerm"
        icon="Search"
        placeholder="Search"
      />
      <ContextMenuItem :item="separator" />
    </div>
    <div
      :class="$style['context-menu__scrollable']"
      :style="fixWidth !== 0 ? { width: fixWidth } : {}"
    >
      <ContextMenuItem
        v-for="(item, index) in filteredItems"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Input from '../input/Input.vue';
import type { ContextMenuItem as Item } from './ContextMenu.types';
import ContextMenuItem from './ContextMenuItem.vue';

/**
 * Separator for search container
 */
const separator: Item = { type: 'separator' };

const props = withDefaults(
  defineProps<{
    /**
     * If true, displays the input field for the search
     */
    showSearch?: boolean;

    /**
     * Array of items for context menu
     */
    items: Item[];
  }>(),
  { showSearch: false }
);

const contextMenu = ref();
let fixWidth = 0;

/**
 * Calculates the fixed width of the container after mounting
 */
onMounted(() => {
  fixWidth = contextMenu.value.getBoundingClientRect().width;
});

/**
 * User entered word for search
 */
const searchTerm = ref('');

/**
 * Returns the list of menu context items found during the search
 */
 const filteredItems = computed(() => {
  const { items } = props;
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase();

  /**
   * If the user has not entered anything, the filter is not applied
   */
  if (lowerCaseSearchTerm === '') {
    return items;
  }

  /**
   * Check what item is separator
   */
  const isSeparator = (item: Item) => item.type === 'separator';

  /**
   * Checks if the element header contains the searched string
   */
  const includesSearchTerm = (item: Item) =>
    (item.type === 'default' || !item.type) &&
    item.title.toLowerCase().includes(lowerCaseSearchTerm);

  /**
   * Filtering items by search query
   */
  const searchedItems = items.filter((item) => {
    if (item.type === 'message') {
      return false;
    } else if (isSeparator(item)) {
      return true;
    } else {
      return includesSearchTerm(item);
    }
  });

  /**
   * While the first element of the filtered array is a separator, remove it
   */
  while (searchedItems.length > 0 && isSeparator(searchedItems[0])) {
    searchedItems.shift();
  }

  /**
   * While the last element of the filtered array is a separator, remove it
   */
  while (searchedItems.length > 0 && isSeparator(searchedItems[searchedItems.length - 1])) {
    searchedItems.pop();
  }

  /**
   * If there are no elements in the filtered array, then nothing was found
   * Returns the appropriate message
   */
  if (searchedItems.length === 0) {
    searchedItems.push(messageItem);
  }

  return searchedItems;
});

/**
 * Message for displaying in context menu if result of search is empty
 */
const messageItem: Item = {
  type: 'message',
  message: 'Nothing found',
};

</script>

<style lang="postcss" module>
.context-menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-very-x);
  width: min-content;

  &__search {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__scrollable {
    display: grid;
    width: max-content;
    gap: var(--spacing-very-x);
  }
}
</style>
