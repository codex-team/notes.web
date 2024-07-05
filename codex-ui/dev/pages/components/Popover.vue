<template>
  <PageHeader>
    Popover
    <template #description>
      Component that will appear near a particular element. Can contain any content.
    </template>
  </PageHeader>
  <Heading
    :level="2"
  >
    Aligning
  </Heading>
  You can choose vertical aligning from <code>below</code> and <code>above</code> and horizontal aligning from <code>left</code> and <code>right</code>.
  <div class="buttons">
    <div>
      <Button
        secondary
        @click="show($event.target, {vertically: 'below', horizontally: 'left'})"
      >
        Open below left
      </Button>
    </div>

    <div>
      <Button
        secondary
        @click="show($event.target, {vertically: 'below', horizontally: 'right'})"
      >
        Open below right
      </Button>
    </div>

    <div>
      <Button
        secondary
        @click="show($event.target, {vertically: 'above', horizontally: 'left'})"
      >
        Open above left
      </Button>
    </div>

    <div>
      <Button
        secondary
        @click="show($event.target, {vertically: 'above', horizontally: 'right'})"
      >
        Open above right
      </Button>
    </div>
  </div>

  <Heading
    :level="2"
  >
    Width
  </Heading>

  By default, width of the popover depends on its content. You can also set it to <code>fit-target</code> to stretch to the width of the target.

  <div class="buttons">
    <div>
      <Button
        secondary
        @click="show($event.target, {vertically: 'below', horizontally: 'left'}, 'auto')"
      >
        "auto" (default)
      </Button>
    </div>

    <div>
      <Button
        secondary
        @click.capture="show($event.target, {vertically: 'below', horizontally: 'left'}, 'fit-target')"
      >
        "fit-target" to stretch to the width of the target
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { usePopover, PopoverShowParams, Button, ContextMenu, Heading } from '../../../src/vue';

const { showPopover } = usePopover();

function show(el: HTMLElement, align: PopoverShowParams['align'], width?: PopoverShowParams['width']) {
  showPopover({
    targetEl: el,
    with: {
      component: ContextMenu,
      props: {
        items: [
          { title: 'Item 1' },
          { title: 'Item 2' },
          { title: 'Item 3' },
        ],
      },
    },
    align,
    width,
  });
}

</script>

<style scoped>
.buttons {
  display: grid;
  gap: var(--spacing-xl);
  margin: var(--spacing-xl) 0 var(--spacing-xxl);
  grid-template-columns: repeat(2, max-content);
}
</style>
