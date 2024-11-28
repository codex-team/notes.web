<template>
  <div
    ref="dropdown"
    :class="$style['dropdown']"
  >
    <Button
      :class="$style['dropdown__btn']"
      :icon="activeItem.icon"
      trailing-icon="BracketsVertical"
      secondary
      @click="togglePopover"
    >
      {{ activeItem.title }}
    </Button>
    <div :style="showPopover ? {'display' : 'block'} : {'display': 'none'}">
      <ContextMenu
        :items="items"
        :show-search="false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ContextMenuItem as Item } from '../context-menu/ContextMenu.types';
import { ContextMenu } from '../context-menu';
import { onMounted, ref } from 'vue';
import { Button } from '../button';

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
    user-select: none;
    background-color: var(--base--bg-secondary);
    margin-bottom: var(--spacing-s);
    padding-right: var(--spacing-s);
  }
  &__btn:hover {
    background-color: var(--base--bg-secondary-hover);
    cursor: pointer;
  }
}
</style>
