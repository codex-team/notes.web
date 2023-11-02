import type { OutputData } from '@editorjs/editorjs';

/**
 * Note could be resolved by this id
 */
export type NoteId = string;

/**
 * Id visible for users. Used to query Note by public API
 */
export type NotePublicId = string;

/**
 * The format we store a note content
 */
export type NoteContent = OutputData;

/**
 * Note entity
 */
export interface Note {

  /**
   * Note public id
   */
     publicId?: NotePublicId;

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
   */
  createdAt?: string;

  /**
   * Last time note was updated
   */
  updatedAt?: string;

}
