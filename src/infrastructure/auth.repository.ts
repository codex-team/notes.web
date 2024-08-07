import type AuthRepositoryInterface from '@/domain/auth.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type AuthStorage from './storage/auth';
import type AuthSession from '@/domain/entities/AuthSession';
import { notEmpty } from './utils/empty';

/**
 * Facade for the auth data
 */
export default class AuthRepository implements AuthRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   * @param authStorage - stores refresh token
   * @param notesApiTransport - notes api transport instance
   */
  constructor(
    private readonly authStorage: AuthStorage,
    notesApiTransport: NotesApiTransport
  ) {
    this.transport = notesApiTransport;
  }

  /**
   * Specify whether we have auth session (refresh token)
   */
  public hasSession(): boolean {
    const refreshToken = this.authStorage.getRefreshToken();

    return notEmpty(refreshToken);
  }

  /**
   * Get new session by refresh token
   */
  public async restoreSession(): Promise<AuthSession> {
    return this.transport.post<AuthSession>(
      {
        endpoint: '/auth',
        data: {
          token: this.authStorage.getRefreshToken(),
        },
        params: {
          skipAuthCheck: true,
        },
      }
    );
  }

  /**
   * Removes session by refresh token
   */
  public async removeSession(): Promise<void> {
    const refreshToken = this.authStorage.getRefreshToken();

    await this.transport.delete('/auth', {
      token: refreshToken,
    });

    this.authStorage.removeRefreshToken();
  }
}
