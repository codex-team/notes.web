import NoteRepository from '@/infrastructure/note.repository';
import NoteStorage from '@/infrastructure/storage/note';
import NotesApiTransport from '@/infrastructure/transport/notes-api';

/**
 * Repositories
 */
export interface Repositories {
  /**
   * Note repository
   *
   */
  noteRepository: NoteRepository;
}

/**
 * Init repositories
 *
 * @param noteApiUrl - Note API url
 * @returns { Repositories } - Repositories
 */
export function init(noteApiUrl: string): Repositories {
  /**
   * Init storages
   */
  const noteStorage = new NoteStorage();

  /**
   * Init transport
   */
  const notesApiTransport = new NotesApiTransport(noteApiUrl);

  /**
   * Init repositories
   */
  const noteRepository = new NoteRepository(noteStorage, notesApiTransport);

  return {
    noteRepository: noteRepository,
  };
}
