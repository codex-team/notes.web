import { type NoteContent, type NoteId } from './Note';

/**
 * Note Tree entity
 */
export interface NoteHierarchy {

  /**
   * public note id
   */
  id: NoteId;

  /**
   * note content
   */
  content: NoteContent | null;

  /**
   * child notes
   */
  childNotes: NoteHierarchy[] | null;

}
