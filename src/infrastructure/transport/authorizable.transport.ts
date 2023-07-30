import Transport from '@/infrastructure/transport';

/**
 * Transport with authorization, requires access token
 */
export default class AuthorizableTransport extends Transport {
  /**
   * Constructor for notes api transport
   *
   * @param baseUrl - Base URL
   */
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * Authorize transport
   *
   * @param accessToken - JWT to send with the authorization header
   */
  public authorize(accessToken: string): void {
    this.headers.set('Authorization', `Bearer ${accessToken}`);
    console.log('transport authorized');
  }
}
