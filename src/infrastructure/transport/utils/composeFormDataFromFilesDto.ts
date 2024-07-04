import type { FilesDto } from '../types/FileDto';
import type JSONValue from '../types/JSONValue';

/**
 * Converts JSON payload and files to FormData
 * @param payload - JSON payload that converts to FormData
 * @param files - Files to append into form data
 */
export const composeFormDataFromFilesDto = (payload: Record<string, JSONValue | undefined> | undefined, files: FilesDto): FormData => {
  const multipartFormData = new FormData();

  files.forEach((file) => {
    if ('file' in file) {
      multipartFormData.append(file.key, file.file);
    } else {
      multipartFormData.append(file.key, file.blob, file.fileName);
    }
  });

  for (let key in payload) {
    const value = payload[key];

    if (value !== undefined) {
      const isPrimitive = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null;

      multipartFormData.append(key, isPrimitive ? String(value) : JSON.stringify(value));
    }
  }

  return multipartFormData;
};
