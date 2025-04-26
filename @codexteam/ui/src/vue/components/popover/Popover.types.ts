import type { Component } from 'vue';

/**
 * Popover content: component and props
 */
export interface PopoverContent {
  /**
   * Component to render in the popover
   */
  component: Component;

  /**
   * Props to pass to the component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}

/**
 * Popover showing configuration
 */
export interface PopoverShowParams {
  /**
   * Element to move popover to
   */
  targetEl: HTMLElement;

  /**
   * Popover content: component and props
   */
  with: PopoverContent;

  /**
   * Vertical and horizontal alignment
   */
  align: {
    vertically: 'above' | 'below';
    horizontally: 'left' | 'right';
  };

  /**
   * Allows to stretch popover to the target element width
   */
  width?: 'fit-target' | 'auto';
}
