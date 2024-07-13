import html2canvas from 'html2canvas';

/**
 * Make html element screenshot
 * @param element - id of element, which we want to be screenshot
 * @param containerStyles - styles for screenshot container
 * @returns binary image data
 */
export async function makeElementScreenshot(element: HTMLElement, containerStyles: Partial<CSSStyleDeclaration>): Promise<Blob | null> {
  /**
   * Create container for filling element to screen
   */
  const screenshotContainer = document.createElement('div');

  screenshotContainer.setAttribute('color-scheme', 'dark');
  screenshotContainer.setAttribute('theme-base', 'graphite');
  screenshotContainer.setAttribute('theme-accent', 'sky');

  /**
   * Assign passed styles to container
   */
  Object.assign(screenshotContainer.style, containerStyles);

  /**
   * Make clone of element for screen to fill container
   */
  const clonedElement = element.cloneNode(true);

  /**
   * Set base styles to container, it need to be out of window
   */
  screenshotContainer.style.position = 'absolute';
  screenshotContainer.style.top = '-9999px';
  screenshotContainer.style.left = '-9999px';

  document.body.appendChild(screenshotContainer);

  screenshotContainer.appendChild(clonedElement);

  const canvas = await html2canvas(screenshotContainer);

  return new Promise((resolve) => {
    canvas.toBlob((data) => {
      resolve(data);
      /**
       * Remove element from container
       */
      screenshotContainer.removeChild(clonedElement);
    }, 'image/png');
  }
  );
}
