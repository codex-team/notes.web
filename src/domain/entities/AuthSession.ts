/**
 * Token pair used for authentication
 */
export default interface AuthSession {
  /**
   * Token used to access protected resources
   */
  accessToken: string;

  /**
   * Token used to refresh access token
   */
  refreshToken: string;
}
