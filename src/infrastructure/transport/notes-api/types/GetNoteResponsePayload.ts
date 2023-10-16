import type { Note } from '@/domain/entities/Note';
import type NotesSettings from '@/domain/entities/NotesSettings';

/**
 * Get note response payload
 */
export type GetNoteResponsePayload = Note;

/**
 * Get notesSettings response payload
 */
export type GetNotesSettingsResponsePayload = NotesSettings;
