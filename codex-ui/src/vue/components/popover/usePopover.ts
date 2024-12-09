import { reactive, ref, shallowRef } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { PopoverContent, PopoverShowParams } from './Popover.types';

/**
 * Shared composable for the Popover component
 *
 * Popover is the empty container that can be moved to the target element and contain any component
 * @example
 * showPopover({
 *   targetEl: el, // element to move popover to
 *   with: {
 *     component: ContextMenu,
 *     props: {
 *       items: [
 *         { title: 'Item 1' },
 *         { title: 'Item 2' },
 *         { title: 'Item 3' },
 *       ],
 *     },
 *   },
 *   align: {
 *     vertically: 'below',
 *     horizontally: 'left',
 *   },
 *   width: 'fit-target',
 * });
 */
export const usePopover = createSharedComposable(() => {
  /**
   * Popover opening state
   */
  const isOpen = ref(false);

  /**
   * Popover position info used in the Popover component
   */
  const position = reactive({
    left: 0,
    top: 0,
    transform: 'translate(0, 0)',
  });

  /**
   * Popover width. Allows to stretch popover to the target element width
   */
  const width = ref<string>('auto');

  /**
   * Popover content: component and props
   */
  const content = shallowRef<PopoverContent | null>(null);

  /**
   * Target element to move popover to
   */
  const targetElement = ref<HTMLElement | null>(null);

  /**
   * Move popover to the target element
   * Also, align and set width
   * @param targetEl - element to move popover to
   * @param align - vertical and horizontal alignment
   * @param widthConfig - allows to stretch popover to the target element width
   */
  function move(targetEl: HTMLElement, align: PopoverShowParams['align'], widthConfig: PopoverShowParams['width'] = 'auto'): void {
    const MARGIN = 6;

    const rect = targetEl.getBoundingClientRect();

    let top = 0;
    let left = 0;
    let transformX = '0';
    let transformY = '0';

    switch (align.vertically) {
      case 'above':
        top = rect.top - MARGIN + window.scrollY;
        transformY = '-100%';
        break;
      case 'below':
        top = rect.bottom + MARGIN + window.scrollY;
        transformY = '0';
        break;
    }

    switch (align.horizontally) {
      case 'left':
        left = rect.left;
        transformX = '0';
        break;
      case 'right':
        left = rect.right;
        transformX = '-100';
        break;
    }

    switch (widthConfig) {
      case 'fit-target':
        width.value = `${rect.width}px`;
        break;
      case 'auto':
        width.value = 'auto';
        break;
    }

    position.left = left;
    position.top = top;
    position.transform = `translate(${transformX}%, ${transformY})`;
  }

  /**
   * Show popover
   */
  function show(): void {
    isOpen.value = true;
  }

  /**
   * Method for attaching a component to the popover
   * @param component - component to attach
   * @param props - props to pass to the component
   */
  function mountComponent(component: PopoverContent['component'], props: PopoverContent['props']): void {
    content.value = {
      component,
      props,
    };
  }

  /**
   * Move popover to the passed element and show it
   * @param params - popover showing configuration
   */
  function showPopover(params: PopoverShowParams): void {
    targetElement.value = params.targetEl;
    move(params.targetEl, params.align, params.width);
    mountComponent(params.with.component, params.with.props);
    show();
  }

  /**
   * Empty content, position and hide popover
   */
  function resetPopover(): void {
    targetElement.value = null;
    content.value = null;
    position.left = 0;
    position.top = 0;
    position.transform = 'translate(0, 0)';

    isOpen.value = false;
  }

  /**
   * Hides and resets the popover
   */
  function hide(): void {
    resetPopover();
  }

  return {
    isOpen,
    showPopover,
    position,
    hide,
    content,
    width,
    targetElement,
  };
});
