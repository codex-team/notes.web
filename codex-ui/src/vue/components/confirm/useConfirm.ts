import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';

export const useConfirm = createSharedComposable(() => {
  /**
   * Text to be displayed in the confirm text block
   */
  const text = ref('');

  const confirm = (content: string): Promise<boolean> => {
    text.value = content;

    return new Promise((resolve) => {
      resolve(true);
    });
  };

  return {
    text,
    confirm,
  };
});
