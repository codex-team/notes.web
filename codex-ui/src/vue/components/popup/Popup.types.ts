import type { Component } from 'vue';

export interface PopupContent {
  /**
   * Component to render in the popup
   */
  component: Component;

  /**
   * Props to pass to the component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}
