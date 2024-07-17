import { createSharedComposable } from '@vueuse/core';
import { ref, shallowRef } from 'vue';
import type { PopupContent } from './Popup.types';

export const usePopup = createSharedComposable(() => {
  /**
   * Popup open state
   */
  const isOpen = ref(false);

  /**
   * Popup content: component and props
   */
  const content = shallowRef<PopupContent | null>(null);

  /**
   * Method for attaching a component to the popup
   * @param component - component to attach
   * @param props - props to pass to the component
   */
  function mountComponent(component: PopupContent['component'], props: PopupContent['props']): void {
    content.value = {
      component,
      props,
    };
  }

  /**
   * Show popup
   */
  function show(): void {
    isOpen.value = true;
  }

  /**
   * Mount component into popup and show it
   * @param params - popup showing configuration
   */
  function showPopup(params: PopupContent): void {
    mountComponent(params.component, params.props);
    show();
  }

  /**
   * Сlear the content inside the popup and hide popup
   */
  function hidePopup(): void {
    content.value = null;
    isOpen.value = false;
  }

  return {
    isOpen,
    showPopup,
    hidePopup,
    content,
  };
});
