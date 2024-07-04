/**
 * Converts an ArrayBuffer to a base64 string.
 * @param buffer - The ArrayBuffer to convert.
 * @returns The base64 string representation of the ArrayBuffer.
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;

  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
};
