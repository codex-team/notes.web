import { type NoteId } from './Note';

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
   * child notes
   */
  childNotes: NoteHierarchy[] | null;

}
