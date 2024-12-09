<template>
  <Button
    :icon="activeItem.icon"
    trailing-icon="BracketsVertical"
    secondary
    @click="!isOpen ? togglePopover($event.currentTarget, {vertically: 'below', horizontally: 'left'}) : hide()"
  >
    {{ activeItem.title }}
  </Button>
</template>
<script setup lang="ts">
import type { ContextMenuItem as Item } from '../context-menu/ContextMenu.types';
import { ContextMenu } from '../context-menu';
import { onMounted, ref } from 'vue';
import { usePopover, PopoverShowParams } from '../popover';
import { Button } from '../button';

const props = defineProps<{
  items: Item[];
}>();

const items = props.items;
const { showPopover, hide, isOpen } = usePopover();

const togglePopover = (el: HTMLElement, align: PopoverShowParams['align']) => {
  showPopover({
    targetEl: el,
    with: {
      component: ContextMenu,
      props: {
        items: items,
      },
    },
    align,
  });
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
    activeItem.value.onActivate = () => {};
    hide();
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
