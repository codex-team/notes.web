import type { Note } from './Note';

/**
 * On new note creation, we use predefined structure of the Editor: header + paragraph
 * We call it NoteDraft
 */
export type NoteDraft = Pick<Note, 'content'>;
