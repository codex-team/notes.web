/**
 * User repository interface provided by domain
 */
export default interface UserRepositoryInterface {
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
