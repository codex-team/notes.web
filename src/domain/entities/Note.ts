import type { OutputData } from '@editorjs/editorjs';
import type EditorTool from './EditorTool';

/**
 * Note could be resolved by this id
 */
export type NoteId = string;

/**
 * The format we store a note content
 */
export type NoteContent = OutputData;

export type NoteTools = {
  /**
   * Name of certain editor tool
   */
  name: EditorTool['name'];

  /**
   * Id of certain editor tool (nanoid)
   */
  id: EditorTool['id'];
};

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
   * @todo Resolve the optionality issue
   */
  createdAt?: string;

  /**
   * Last time note was updated
   *
   * @todo Resolve the optionality issue
   */
  updatedAt?: string;
}
