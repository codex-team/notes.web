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
  /**
   * If the user has not entered anything, the filter is not applied
   */
  if (searchTerm.value === '') {
    return props.items;
  }

  /**
   * If the string entered by the user is included in some element, it will be returned
   */
  const searchedItems = props.items.filter((item) => {
    if (item.type === 'message') {
      return false;
    } else if (item.type === 'separator') {
      return true;
    } else {
      return item.title.toLowerCase().includes(
        searchTerm.value.toLowerCase());
    }
  });

  /**
   * Deleting useless separators
   */
  if (searchedItems.length > 0) {
    let items = searchedItems;

    if (searchedItems[0].type === 'separator') {
      items = searchedItems.slice(1);
    }
    if (searchedItems[searchedItems.length - 1].type === 'separator') {
      items = searchedItems.slice(0, searchedItems.length - 1);
    }

    return items;
  } else {
    return messageItem;
  }
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
