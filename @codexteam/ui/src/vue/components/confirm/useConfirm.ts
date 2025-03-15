import { createSharedComposable } from '@vueuse/core';
import { usePopup } from '../popup';
import { Confirm } from '.';

export const useConfirm = createSharedComposable(() => {
  /**
   * Used to create a Popup component that will display the current Confirm
   */
  const { showPopup, hidePopup } = usePopup();

  /**
   * @param title - title of the confirm window
   * @param text - message to be displayed in confirm window
   * @returns user selection result
   */
  async function confirm(title: string, text: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      showPopup({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        component: Confirm,
        props: {
          title: title,
          text: text,
          onCancel: () => {
            resolve(false);
            hidePopup();
          },
          onConfirm: () => {
            resolve(true);
            hidePopup();
          },
        },
      });
    });
  }

  return {
    confirm,
  };
});
