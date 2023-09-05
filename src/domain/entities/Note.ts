import type { OutputData } from '@editorjs/editorjs';

/**
 * Note entity
 */
export default interface Note {
  /**
   * Note public id
   */
  publicId: string;

  /**
   * Note title
   */
  title: string;

  /**
   * Note content
   */
  content: OutputData;
}
