/**
 * Represents a file data transfer object.
 */
type FileDto = {
  /**
   * Form field key
   */
  key: string;
  /**
   * The blob data of the file.
   */
  blob: Blob;
  /**
   * File name that will be used on the server.
   */
  fileName: string;
} | {
  /**
   * Form field key
   */
  key: string;
  /**
   * The file object.
   */
  file: File;
};

export type FilesDto = FileDto[];
