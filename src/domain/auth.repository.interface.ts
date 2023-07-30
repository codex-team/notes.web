/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface AuthRepositoryInterface {
  /**
   * Get new session by refresh token
   *
   * @param refreshToken - token used to get new token pair
   */
  restoreSession(refreshToken: string): Promise<void>;

  /**
   * Removes session by refresh token
   */
  removeSession(): Promise<void>;
}
