import Transport from '@/infrastructure/transport';
import type { FetchTransportOptions } from './fetch.transport';

/**
 * Additional options for authorizable transport
 */
export interface AuthorizableTransportOptions extends FetchTransportOptions {}

/**
 * Transport with authorization, requires access token
 */
export default class AuthorizableTransport extends Transport {
  /**
   * Constructor for notes api transport
   *
   * @param baseUrl - Base URL
   * @param options - Transport options
   */
  constructor(baseUrl: string, options?: AuthorizableTransportOptions) {
    super(baseUrl, options);
  }

  /**
   * Authorize transport
   *
   * @param accessToken - JWT to send with the authorization header
   */
  public authorize(accessToken: string): void {
    this.headers.set('Authorization', `Bearer ${accessToken}`);
  }
}
