import type AuthSession from './entities/AuthSession';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface AuthRepositoryInterface {
  /**
   * Checks whether we have saved refresh token
   */
  hasSession(): boolean;

  /**
   * Get new session by refresh token
   */
  restoreSession(): Promise<AuthSession>;

  /**
   * Removes session by refresh token
   */
  removeSession(): Promise<void>;
}
