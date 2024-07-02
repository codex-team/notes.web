import type { Note } from './Note';

type NoteListItem = Note & {
  cover: string | null;
};

/**
 * Note list  entity.
 * An object with the "items" property containing a list of all existing notes created by the user
 */
export type NoteList = {
  items: NoteListItem[];
};
