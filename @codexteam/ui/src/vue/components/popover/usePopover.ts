import { onScopeDispose, reactive, ref, shallowRef } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { PopoverContent, PopoverShowParams } from './Popover.types';
import { throttle } from '../../utils';

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
    left: '0px',
    top: '0px',
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
   * Last alignment config, stored for recalculating position on scroll/resize
   */
  let lastAlign: PopoverShowParams['align'] = {
    vertically: 'below',
    horizontally: 'left',
  };

  /**
   * Last width config, stored for recalculating position on scroll/resize
   */
  let lastWidthConfig: PopoverShowParams['width'] = 'auto';

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

    let top = '0px';
    let left = '0px';
    let transformX = '0';
    let transformY = '0';

    switch (align.vertically) {
      case 'above':
        top = `${rect.top - MARGIN + window.scrollY}px`;
        transformY = '-100%';
        break;
      case 'below':
        top = `${rect.bottom + MARGIN + window.scrollY}px`;
        transformY = '0';
        break;
    }

    switch (align.horizontally) {
      case 'left':
        left = `${rect.left + window.scrollX}px`;
        transformX = '0';
        break;
      case 'right':
        left = `${rect.right + window.scrollX}px`;
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
   * Recalculate popover position using stored target and alignment
   * Called on scroll/resize to keep popover anchored to the target element
   */
  function updatePosition(): void {
    if (!isOpen.value || !targetElement.value) {
      return;
    }

    move(targetElement.value, lastAlign, lastWidthConfig);
  }

  /**
   * Delay in milliseconds for throttling scroll/resize reposition (~60fps)
   */
  const REPOSITION_THROTTLE_DELAY_MS = 16;

  /**
   * Throttled handler for scroll/resize events
   */
  const onRepositionThrottled = throttle(updatePosition, REPOSITION_THROTTLE_DELAY_MS);

  /**
   * Start listening for scroll/resize to reposition popover
   */
  function startRepositionListeners(): void {
    window.addEventListener('scroll', onRepositionThrottled, {
      capture: true,
      passive: true,
    });
    window.addEventListener('resize', onRepositionThrottled, { passive: true });
  }

  /**
   * Stop listening for scroll/resize
   */
  function stopRepositionListeners(): void {
    window.removeEventListener('scroll', onRepositionThrottled, { capture: true });
    window.removeEventListener('resize', onRepositionThrottled);
  }

  /**
   * Safety net: clean up window listeners if the Vue scope is disposed
   * while the popover is still open (e.g. last consumer unmounts)
   */
  onScopeDispose(stopRepositionListeners);

  /**
   * Show popover
   */
  function show(): void {
    isOpen.value = true;
    startRepositionListeners();
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
    lastAlign = params.align;
    lastWidthConfig = params.width;
    move(params.targetEl, params.align, params.width);
    mountComponent(params.with.component, params.with.props);
    show();
  }

  /**
   * Empty content, position and hide popover
   */
  function resetPopover(): void {
    stopRepositionListeners();
    targetElement.value = null;
    content.value = null;
    position.left = '0px';
    position.top = '0px';
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
