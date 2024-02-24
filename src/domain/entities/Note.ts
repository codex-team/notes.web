import type { OutputData } from '@editorjs/editorjs';

/**
 * Note could be resolved by this id
 */
export type NoteId = string;

/**
 * The format we store a note content
 */
export type NoteContent = OutputData;

/**
 * Note entity
 */
export interface Note {
  /**
   * Note unique identifier visible to the user
   */
  id: NoteId;

  /**
   * Note content
   */
  content: NoteContent;

  /**
   * When note was created
   *
   * @TODO Resolve the optionality issue
   */
  createdAt?: string;

  /**
   * Last time note was updated
   *
   * @TODO Resolve the optionality issue
   */
  updatedAt?: string;
}
