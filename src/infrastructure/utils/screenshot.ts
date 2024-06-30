import html2canvas from 'html2canvas'

interface Params {
  elementId: string,
  height: number
  width: number
}

export async function makeElementScreenshot(params: Params): Promise<Blob | null> {
  const { elementId, height, width } = params;
  const element = document.getElementById(elementId);

  if (element === null) {
    return null;
  }

  const canvas = await html2canvas(element, {height, width, onclone: function (clonedDoc) {
    clonedDoc.getElementById(elementId)!.style.display = 'block';
}});

  return new Promise((resolve) => {
    canvas.toBlob((data) => resolve(data), 'image/png')
    }
  )
}
