import type { Note } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights.ts';

/**
 * Get note response payload
 */
export type GetNoteResponsePayload = {
  note: Note;
  accessRights: NoteAccessRights;
  parentNote: Note | undefined;
};
