<template>
  <Button
    :icon="activeItem.icon"
    trailing-icon="BracketsVertical"
    secondary
    @click="togglePopover($event.currentTarget, {vertically: 'below', horizontally: 'left'})"
  >
    {{ activeItem.title }}
  </Button>
</template>
<script setup lang="ts">
import type { ContextMenuItem as SelectItem, DefaultItem } from '../context-menu/ContextMenu.types';
import { ContextMenu } from '../context-menu';
import { onMounted, ref } from 'vue';
import { usePopover, PopoverShowParams } from '../popover';
import { Button } from '../button';

const emit = defineEmits(['valueUpdate']);
const props = defineProps<{
  items: SelectItem[];
  defaultItem: DefaultItem;
}>();

const items = props.items;
const { showPopover, hide, isOpen } = usePopover();

const togglePopover = (el: HTMLElement, align: PopoverShowParams['align']) => {
  if (!isOpen.value) {
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
  } else {
    hide();
  }
};

/* Default item value for select on page load */
const defaultValue: SelectItem = props.defaultItem;
const activeItem = ref(defaultValue);

/* Main function to update selected item */
/* Also creates new event, which could be caught outside */

const updateActiveItem = (item: DefaultItem) => {
  activeItem.value = item;
  emit('valueUpdate', activeItem.value);
  hide();
};

onMounted(() => {
  items.forEach((item) => {
    if (item.type === 'default' || !item.type) {
      item.onActivate = () => updateActiveItem(item);
    }
  });
});

</script>
