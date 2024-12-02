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
      @click="togglePopover($event.target, {vertically: 'below', horizontally: 'left'})"
    >
      {{ activeItem.title }}
    </Button>
  </div>
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

let isOpened = false;
const items = props.items;
const { showPopover, hide } = usePopover();

function togglePopover(el: HTMLElement, align: PopoverShowParams['align']) {
  if (!isOpened) {
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
  isOpened = !isOpened;
}

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
