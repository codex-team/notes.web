/**
 * Half size is enough for a list card and keeps the file around 15 KB instead of 400 KB on retina screens
 */
const COVER_SCALE = 0.5;

const COVER_QUALITY = 0.8;

/**
 * Make html element screenshot
 * @param element - element to take a screenshot of
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

  Object.assign(screenshotContainer.style, containerStyles, {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
  });

  /**
   * Clone synchronously, so the screenshot shows the element as it is now even if the page changes meanwhile
   */
  screenshotContainer.appendChild(element.cloneNode(true));
  document.body.appendChild(screenshotContainer);

  try {
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(screenshotContainer, { scale: COVER_SCALE });

    return await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', COVER_QUALITY));
  } finally {
    screenshotContainer.remove();
  }
}
