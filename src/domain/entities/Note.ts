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

/**
 * Single tool used in note
 */
export type NoteTool = {
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
   */
  createdAt: string;

  /**
   * Last time note was updated
   */
  updatedAt: string;
}
