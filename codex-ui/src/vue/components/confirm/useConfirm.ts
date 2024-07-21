import { createSharedComposable } from '@vueuse/core';
import { usePopup } from '../popup';
import { ref } from 'vue';
import { Confirm } from '.';

export const useConfirm = createSharedComposable(() => {
  /**
   * Represents the result of the user's selection: false - Cancel button was pressed,
   * true - Confirm button was pressed, undefined - no selection has been made yet
   */
  const result = ref<boolean | undefined>();

  /**
   * Used to create a Popup component that will display the current Confirm
   */
  const { showPopup } = usePopup();

  /**
   * Confirm button was pressed
   */
  function onCancel(): void {
    result.value = false;
    console.log('The cancel button was pressed');
  }

  /**
   * Cancel button was pressed
   */
  function onConfirm(): void {
    result.value = true;
    console.log('The confirm button was pressed');
  }

  /**
   *
   * @param title - title of the confirm window
   * @param text - message to be displayed in confirm window
   * @returns user selection result
   */
  async function confirm(title: string, text: string): Promise<boolean | undefined> {
    showPopup({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      component: Confirm,
      props: {
        title: title,
        text: text,
      },
    });

    return new Promise<boolean | undefined>((resolve) => {
      resolve(result.value);
    });
  };

  return {
    confirm,
    onCancel,
    onConfirm,
  };
});
