<template>
  <div
    v-show="isOpen"
    ref="popoverEl"
    :class="$style.popover"
  >
    <component
      :is="content.component"
      v-if="content"
      v-bind="content.props"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePopover } from './usePopover';
import { onClickOutside } from '@vueuse/core';

/**
 * Reference to the popover element
 * Used to bind click-outside event
 */
const popoverEl = ref<HTMLDivElement | null>(null);

const {
  isOpen,
  position,
  hide,
  content,
  width,
} = usePopover();

/**
 * Close the popover when clicking outside of it
 */
onClickOutside(popoverEl, hide);
</script>

<style module>
.popover {
  position: absolute;
  z-index: var(--z-popover);
  background-color: var(--base--bg-secondary);
  border-radius: var(--radius-field);
  border: 1px solid var(--base--border);
  padding: var(--h-padding);
  left: v-bind('position.left');
  top: v-bind('position.top');
  transform: v-bind('position.transform');
  width: v-bind('width');
  box-sizing: border-box;
}
</style>
