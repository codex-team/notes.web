/**
 * Stores auth data in local storage
 */
export default class AuthStorage {
  /**
   * Storage implementation
   */
  private readonly storage: Storage;

  /**
   * Creates storage instance
   */
  constructor() {
    this.storage = window.localStorage;
  }

  /**
   * Returns refresh token
   */
  public getRefreshToken(): string | null {
    return this.storage.getItem('refreshToken');
  }

  /**
   * Save refresh token
   *
   * @param refreshToken - refresh token to save
   */
  public setRefreshToken(refreshToken: string): void {
    this.storage.setItem('refreshToken', refreshToken);
  }
}
