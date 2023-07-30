import type UserRepositoryInterface from '@/domain/user.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type AuthStorage from './storage/auth';

/**
 * Facade for the user data
 */
export default class UserRepository implements UserRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Note repository constructor
   *
   * @param authStorage - stores refresh token
   * @param notesApiTransport - notes api transport instance
   */
  constructor(private readonly authStorage: AuthStorage, notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Get new session by refresh token
   *
   * @param refreshToken - token used to get new token pair
   */
  public async restoreSession(refreshToken: string): Promise<void> {
    const response = this.transport.post('/auth', {
      token: refreshToken,
    });

    console.log('restoreSession response', response);
  }

  /**
   * Removes session by refresh token
   */
  public async removeSession(): Promise<void> {
    const refreshToken = this.authStorage.getRefreshToken();

    const response = this.transport.delete('/auth', {
      token: refreshToken,
    });

    console.log('removeSession response', response);
  }
}
