import { PersistantStore } from './abstract/persistant';

export type AuthStoreData = {
  refreshToken: string;
};

/**
 * Stores auth data in local storage
 */
export default class AuthStorage extends PersistantStore<AuthStoreData> {
  constructor() {
    super(['refreshToken']);
  }

  /**
   * Returns refresh token
   */
  public getRefreshToken(): string | null {
    return this.data.refreshToken === undefined ? null : this.data.refreshToken;
  }

  /**
   * Save refresh token
   * @param refreshToken - refresh token to save
   */
  public setRefreshToken(refreshToken: string): void {
    this.data.refreshToken = refreshToken;
  }

  /**
   * Removes refresh token
   */
  public removeRefreshToken(): void {
    this.data.refreshToken = '';
  }
}
