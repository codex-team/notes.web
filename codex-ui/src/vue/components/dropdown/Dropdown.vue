<template>
  <div
    ref="dropdown"
    :class="$style['dropdown']"
  >
    <div
      :class="$style['dropdown__btn']"
      @click="togglePopover"
    >
      <ContextMenuItem :item="activeItem" />
      <svg :class="$style['dropdown__icon']" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 7.5L10 4.16667L6.66668 7.5" stroke="#747E88" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.3333 12.5L10 15.8333L6.66668 12.5" stroke="#747E88" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div :style="showPopover ? {'display' : 'block'} : {'display': 'none'}">
      <ContextMenu
        :items="items"
        :show-search="false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import ContextMenuItem from '../context-menu/ContextMenuItem.vue';
import type { ContextMenuItem as Item } from '../context-menu/ContextMenu.types';
import { ContextMenu } from '../context-menu';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  items: Item[];
}>();

const items = props.items;
const showPopover = ref(false);

/* hide/show context menu */
const togglePopover = () => {
  showPopover.value = !showPopover.value;
};

/* Default item value for select on page load */
const defaultValue: Item = {
  title: 'Choose an option',
  type: 'default',
  onActivate: () => {},
};
const activeItem = ref(defaultValue);

/* Main function to update selected item */
const updateActiveItem = (item: Item) => {
  if (item.type === 'default' || !item.type) {
    activeItem.value = Object.create(item);
    // eslint-disable-next-line no-console
    activeItem.value.onActivate = console.log;
    togglePopover();
  }
};

onMounted(() => {
  items.forEach((item) => {
    if (item.type === 'default' || !item.type) {
      item.onActivate = () => updateActiveItem(item);
    }
  });
});

</script>
<style lang="postcss" module>
.dropdown {
  &__btn {
    display: flex;
    align-items: center;
    width: max-content;
    user-select: none;
    border-radius: var(--radius-m);
    background-color: var(--base--bg-secondary);
    margin-bottom: calc(0.75 * var(--h-padding));
  }
  &__btn:hover {
    background-color: var(--base--bg-secondary-hover);
    cursor: pointer;
  }
  &__icon {
    padding-right: var(--v-padding);
  }
}
</style>
