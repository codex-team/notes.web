import type { Ref, CSSProperties } from 'vue';
import { createSharedComposable  } from '@vueuse/core';
import { ref } from 'vue';

/* eslint-disable @typescript-eslint/naming-convention */

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
 * Returns params of the text before caret position
 */
function getPrecaretTextParams(): {
  text: string;
  styles: Record<string, string>
  } {
  const selection = document.getSelection();

  selection.modify('extend', 'backward', 'lineboundary');
  const text = selection.toString();

  const node = selection.focusNode; // node where selection ends
  const computedStyles = getComputedStyle(node.parentElement);

  if (selection.rangeCount > 0) {
    selection.collapseToEnd();
  }

  const styles = {
    'font-size': computedStyles.fontSize,
    'font-family': computedStyles.fontFamily.replace(/"/g, '\''),
    'font-weight': computedStyles.fontWeight,
    'line-height': computedStyles.lineHeight,
    opacity: '0',
  };

  return {
    text,
    styles,
  };
}


/**
 *
 * @param text
 * @param styles
 */
function buildPlaceholder(text: string, styles: Record<string, string>): string {
  const stylesString = Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join('');

  return `<span style="${stylesString}">${text}</span> `;
}


/**
 * Allows to use text completion in the note editor
 */
export default createSharedComposable(({ onPaste = () => {} }): {
  isDisplayed: Ref<boolean>,
  text: Ref<string>,
  styles: Ref<CSSProperties>;
  show: (content: string) => Promise<void>;
  hide: () => void;
  attach: (el: HTMLElement) => void;
  detach: () => void
  } => {
  /**
   * True if suggest should be displayed
   */
  const isDisplayed = ref(false);

  /**
   * Suggest html content
   */
  const text = ref('');

  /**
   * Raw suggestion text
   */
  let rawText = '';

  let insertExpected = false;

  let editorContainer: HTMLElement | undefined;

  /**
   * CSS styles to be applied to suggest container
   */
  const styles = ref<CSSProperties>({
    '--left': '0',
    '--top': '0',
  });

  /**
   * Displays suggestion on how to complete specified text
   *
   * @param data - suggestion text
   */
  async function show(data: string): Promise<void> {
    const precaretTextParams = getPrecaretTextParams();

    if (!data.endsWith(precaretTextParams.text)) {
      return;
    }
    const placeholderString = buildPlaceholder(precaretTextParams.text, precaretTextParams.styles);

    text.value = placeholderString + data;
    isDisplayed.value = true;
    rawText = data;
    insertExpected = true;

    const { x, y } = getLineStartCoordinates();

    styles.value = {
      '--left': x + 'px',
      '--top': y + 'px',
      '--font-size': precaretTextParams.styles['font-size'],
      '--line-height': precaretTextParams.styles['line-height'],
    };
  }

  /**
   * Hides suggestion
   */
  function hide(): void {
    text.value = '';
    isDisplayed.value = false;
    styles.value = {
      ...styles.value,
      '--left': '0',
      '--top': '0',
    };
  }

  /**
   *
   * @param editorContainer
   * @param el
   */
  function attach(el: HTMLElement): void {
    el.addEventListener('keydown', onKeydown);
    el.addEventListener('blur', onBlur);

    editorContainer = el;
  }

  /**
   *
   * @param e
   */
  function onKeydown(e: KeyboardEvent): void {
    hide();
    console.log('keydown');
    if (e.key === 'Tab' && insertExpected) {
      e.preventDefault();
      onPaste(rawText);
    }

    insertExpected = false;
  }

  /**
   *
   */
  function onBlur(): void {
    console.log('blur');
    insertExpected = false;
    hide();
  }

  /**
   *
   */
  function detach(): void {
    editorContainer.removeEventListener('keydown', onKeydown);
    editorContainer.removeEventListener('blur', onBlur);
  }

  return {
    show,
    hide,
    attach,
    detach,
    isDisplayed,
    text,
    styles,
  };
});

