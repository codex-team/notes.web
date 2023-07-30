import type UserRepositoryInterface from '@/domain/user.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type UserStorage from './storage/user';

/**
 * Facade for the user data
 */
export default class UserRepository implements UserRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   *
   * @param userStorage - stores refresh token
   * @param notesApiTransport - notes api transport instance
   */
  constructor(private readonly userStorage: UserStorage, notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Load user data and put it to the storage
   */
  public async loadUser(): Promise<void>  {
    const response = await this.transport.get('/user/myself');

    console.log('response', response);
  }
}
