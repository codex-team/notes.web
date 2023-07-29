import { getCookie, setCookie } from 'typescript-cookie';

/**
 * Cookie storage implementation to manage cookies
 */
export default class Cookies {
  /**
   * Empty constructor for cookie storage
   */
  constructor() {
    /**
     * Empty
     */
  }

  /**
   * Set cookie data
   *
   * @param key - identifier
   * @param value - cookie value
   */
  public set(key: string, value: string): void {
    setCookie(key, value);
  }

  /**
   * Get cookie data by key
   *
   * @param key - identifier
   * @returns {string | undefined} - cookie data
   */
  public get(key: string): string | undefined {
    return getCookie(key);
  }
}
