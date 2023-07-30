import type Note from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Get note response payload
 */
type GetNoteResponsePayload = Note;

/**
 * Get notesSettings response payload
 */
type GetNotesSettingsResponsePayload = NotesSettings;

export type {
  GetNoteResponsePayload,
  GetNotesSettingsResponsePayload
};
