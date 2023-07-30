import type AuthRepositoryInterface from '@/domain/auth.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type AuthStorage from './storage/auth';
import type AuthSession from '@/domain/entities/AuthSession';

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
   *
   * @param authStorage - stores refresh token
   * @param notesApiTransport - notes api transport instance
   */
  constructor(private readonly authStorage: AuthStorage, notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Specify whether we have auth session (refresh token)
   */
  public hasSession(): boolean {
    return this.authStorage.getRefreshToken() !== null;
  }

  /**
   * Get new session by refresh token
   */
  public async restoreSession(): Promise<AuthSession> {
    return this.transport.post<AuthSession>('/auth', {
      token: this.authStorage.getRefreshToken(),
    });
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
