<template>
  <Button
    :icon="currentItem.icon"
    :disabled="isDisabled"
    trailing-icon="BracketsVertical"
    secondary
    @click="togglePopover($event.currentTarget)"
  >
    {{ currentItem.title }}
  </Button>
</template>
<script setup lang="ts">
import type { ContextMenuItem as SelectItem, DefaultItem } from '../context-menu/ContextMenu.types';
import { ContextMenu } from '../context-menu';
import { onMounted } from 'vue';
import { usePopover, PopoverShowParams } from '../popover';
import { Button } from '../button';

const props = defineProps<{
  align: PopoverShowParams['align'];
  isDisabled: boolean;
  items: SelectItem[];
}>();

const align = props.align;
const items = props.items;
const { showPopover, hide, isOpen } = usePopover();

const togglePopover = (el: HTMLElement) => {
  if (!isOpen.value && !props.isDisabled) {
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
const currentItem = defineModel<DefaultItem>({ required: true });

/* Main function to update selected item */
const updateActiveItem = (item: DefaultItem) => {
  currentItem.value = item;
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
