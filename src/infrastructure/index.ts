import NoteRepository from '@/infrastructure/note.repository';
import NoteStorage from '@/infrastructure/storage/note';
import NotesApiTransport from '@/infrastructure/transport/notes-api';
import UserRepository from '@/infrastructure/user.repository';

/**
 * Repositories
 */
export interface Repositories {
  /**
   * Working with Note data
   */
  note: NoteRepository;

  /**
   * Working with User data
   */
  user: UserRepository;
}

/**
 * Init repositories
 *
 * @param noteApiUrl - Note API url
 */
export function init(noteApiUrl: string): Repositories {
  /**
   * Init storages
   */
  const noteStorage = new NoteStorage();
  const authStorage = new AuthStorage();

  /**
   * Init transport
   */
  const notesApiTransport = new NotesApiTransport(noteApiUrl);

  /**
   * Init repositories
   */
  const noteRepository = new NoteRepository(noteStorage, notesApiTransport);
  const userRepository = new UserRepository(authStorage, notesApiTransport);

  return {
    note: noteRepository,
    user: userRepository,
  };
}
