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
      <template v-if="filteredItems.length > 0">
        <ContextMenuItem
          v-for="(item, index) in filteredItems"
          :key="index"
          :item="item"
        />
      </template>
      <template v-else>
        <ContextMenuItem :item="messageItem" />
      </template>
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

    /**
     * Message what occurs as a result of the search
     */
    message: string;
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
  if (searchTerm.value === '') {
    return props.items;
  }

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

  if (searchedItems.length > 0) {
    return searchedItems[0].type === 'separator'
      ? searchedItems.slice(1)
      : searchedItems;
  }

  return searchedItems;
});

/**
 * Message for displaying in context menu if result of search is empty
 */
const messageItem: Item = {
  type: 'message',
  message: props.message,
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
