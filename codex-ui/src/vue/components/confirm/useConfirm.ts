import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';

export const useConfirm = createSharedComposable(() => {
  /**
   * Text to be displayed in the confirm text block
   */
  const text = ref('');

  /**
   * Represents the result of the user's selection: false - Cancel button was pressed,
   * true - Confirm button was pressed, undefined - no selection has been made yet
   */
  const result = ref<boolean | undefined>();

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
   * @param content - message to be displayed in confirm window
   * @returns user selection result
   */
  async function confirm(content: string): Promise<boolean | undefined> {
    text.value = content;

    return new Promise<boolean | undefined>((resolve) => {
      resolve(result.value);
    });
  };

  return {
    text,
    confirm,
    onCancel,
    onConfirm,
  };
});
