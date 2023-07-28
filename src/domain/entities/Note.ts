import type { OutputData } from '@editorjs/editorjs';

/**
 * Note entity
 */
export default interface Note {
  /**
   * Note id
   */
  id: number;

  /**
   * Note title
   */
  title: string;

  /**
   * Note content
   */
  content: OutputData;
}
