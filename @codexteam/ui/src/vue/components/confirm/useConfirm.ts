import { createSharedComposable } from '@vueuse/core';
import { watch } from 'vue';
import { usePopup } from '../popup';
import { Confirm } from '.';

/**
 * Optional texts and style of the confirm window
 */
export interface ConfirmOptions {
  /**
   * Text of the confirm button
   */
  confirmText?: string;

  /**
   * Text of the cancel button
   */
  cancelText?: string;

  /**
   * Style the confirm button as a negative action
   */
  destructive?: boolean;
}

export const useConfirm = createSharedComposable(() => {
  /**
   * Used to create a Popup component that will display the current Confirm
   */
  const { showPopup, hidePopup, isOpen } = usePopup();

  /**
   * @param title - title of the confirm window
   * @param text - message to be displayed in confirm window
   * @param options - button texts and style
   * @returns user selection result, false if the popup was closed without a choice
   */
  async function confirm(title: string, text: string, options: ConfirmOptions = {}): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const stop = watch(isOpen, (open) => {
        if (!open) {
          stop();
          resolve(false);
        }
      });

      showPopup({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        component: Confirm,
        props: {
          ...options,
          title: title,
          text: text,
          onCancel: () => {
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
