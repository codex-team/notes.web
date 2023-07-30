import type { Ref, CSSProperties } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { noteService } from '@/domain';


/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Allows to use text completion in the note editor
 */
export default createSharedComposable(function (): {
  isDisplayed: Ref<boolean>,
  text: Ref<string>,
  styles: CSSProperties;
  show: (content: string) => Promise<void>;
  hide: () => void;
  } {
  /**
   * True if suggest should be displayed
   */
  const isDisplayed = ref(false);

  /**
   * Suggest html content
   */
  const text = ref('');

  /**
   * CSS styles to be applied to suggest container
   */
  const styles = reactive<CSSProperties>({
    '--left': '0',
    '--top': '0',
  });

  /**
   * Displays suggestion on how to complete specified text
   *
   * @param context - text to complete
   */
  async function show(context: string): Promise<void> {
    const precaretText = getPrecaretText();

    // const data = await noteService.fetchSuggestions(context);
    const data = context;
    const invisibleString = `<span style="opacity: 0">${precaretText}</span> `;

    text.value = invisibleString + data;

    isDisplayed.value = true;

    const { x, y } = getLineStartCoordinates();

    styles['--left'] = x + 'px';
    styles['--top'] = y + 'px';
  }

  /**
   *  Hides suggestion
   */
  function hide(): void {
    text.value = '';
    isDisplayed.value = false;
    styles['--left'] = '0';
    styles['--top'] = '0';
  }

  return {
    show,
    hide,
    isDisplayed,
    text,
    styles,
  };
});

/**
 * Returns text line start coordinates
 */
function getLineStartCoordinates(): { x: number, y: number } {
  const isSupported = typeof window.getSelection !== 'undefined';

  if (!isSupported) {
    return;
  }
  const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return;
  }
  selection.modify('extend', 'backward', 'lineboundary');
  const range = selection.getRangeAt(0).cloneRange();

  range.setEnd(range.endContainer, 0);
  selection.collapseToEnd();
  const rect = range.getBoundingClientRect();

  if (!rect) {
    return;
  }

  return {
    x : rect.left,
    y: rect.top,
  };
}


/**
 * Returns text before caret position
 */
function getPrecaretText(): string {
  const selection = document.getSelection();

  selection.modify('extend', 'backward', 'lineboundary');
  const text = selection.toString();

  selection.collapseToEnd();

  return text;
}
