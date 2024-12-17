import type EditorTool from './EditorTool';
import type { Note } from './Note';
import type NoteAccessRights from './NoteAccessRights';

/**
 * Note Datsa Transfer Object used to pass Note data between layers
 */
export interface NoteDTO {
  /**
   * Note data
   */
  note: Note;

  /**
   * Note access rights
   */
  accessRights: NoteAccessRights;

  /**
   * Parent note if exists
   */
  parentNote: Note | undefined;

  /**
   * Editor tools
   */
  tools: EditorTool[];

  /**
   * Note parents
   */
  parents: Note[];
}
