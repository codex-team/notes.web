import html2canvas from 'html2canvas';

/**
 * Make html element screenshot
 * @param elementId - id of element, which we want to be screenshot
 * @returns binary image data
 */
export async function makeElementScreenshot(elementId: string): Promise<Blob | null> {
  const element = document.getElementById(elementId);

  /**
   * Return null if element not found
   */
  if (element === null) {
    return null;
  }

  const canvas = await html2canvas(element);

  return new Promise((resolve) => {
    canvas.toBlob(data => resolve(data), 'image/png');
  }
  );
}
