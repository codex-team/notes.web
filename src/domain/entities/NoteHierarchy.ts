import { type NoteId } from './Note';
import type { SidebarPosition } from './NoteSettings';

/**
 * Note Tree entity
 */
export interface NoteHierarchy {

  /**
   * public note id
   */
  noteId: NoteId;

  /**
   * note title
   */
  noteTitle: string;

  /**
   * Position of the sidebar relative to the note content
   */
  sidebarPosition: SidebarPosition;

  /**
   * child notes
   */
  childNotes: NoteHierarchy[] | null;

}
