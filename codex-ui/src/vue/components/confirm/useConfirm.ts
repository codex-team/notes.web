import { createSharedComposable } from '@vueuse/core';
import { usePopup } from '../popup';
import { ref } from 'vue';
import { Confirm } from '.';

export const useConfirm = createSharedComposable(() => {
  /**
   * Represents the result of the user's selection: false - Cancel button was pressed,
   * true - Confirm button was pressed, undefined - no selection has been made yet
   */
  const result = ref<boolean>();

  /**
   * Used to create a Popup component that will display the current Confirm
   */
  const { showPopup } = usePopup();

  /**
   * Confirm button was pressed
   */
  function onCancel(): void {
    result.value = false;
  }

  /**
   * Cancel button was pressed
   */
  function onConfirm(): void {
    result.value = true;
  }

  /**
   *
   * @param title - title of the confirm window
   * @param text - message to be displayed in confirm window
   * @returns user selection result
   */
  async function confirm(title: string, text: string): Promise<boolean> {
    showPopup({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      component: Confirm,
      props: {
        title: title,
        text: text,
      },
    });

    /**
     * Check if the user has pressed the confirm or close button
     */
    return new Promise<boolean>((resolve) => {
      if (result.value !== undefined) {
        resolve(result.value);
      }
    });
  };

  return {
    confirm,
    onCancel,
    onConfirm,
  };
});
