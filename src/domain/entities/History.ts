import type EditorTool from './EditorTool';
import type { Note } from './Note';
import type { User } from './User';

interface UserMeta {
  /**
   * Name of the user
   */
  name: User['name'];

  /**
   * Photo of the user
   */
  photo: User['photo'];
};

export interface NoteHistoryRecord {
  /**
   * Unique identified of note history record
   */
  id: number;

  /**
   * Id of the note whose content history is stored
   */
  noteId: Note['id'];

  /**
   * User that updated note content
   */
  userId: User['id'];

  /**
   * Timestamp of note update
   */
  createdAt: string;

  /**
   * Version of note content
   */
  content: Note['content'];

  /**
   * Note tools of current version of note content
   */
  tools: EditorTool[];
}

/**
 * Meta data of the note history record
 * Used for presentation of the note history record in web
 */
export type NoteHistoryMeta = Omit<NoteHistoryRecord, 'content' | 'noteId' | 'tools'> & {
  /**
   * Meta data of the user who did changes
   * Used for note history metadata presentation
   */
  user: UserMeta;
};
