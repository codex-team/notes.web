import Transport from '@/infrastructure/transport';
import jwtDecode from 'jwt-decode';

/**
 * Access token payload, which contains expiration time
 */
interface AccessTokenPayload {
  exp: number;
}

/**
 *
 */
export default class AuthtorizableTransport extends Transport {
  /**
   * Access token for authorization
   */
  private _accessToken: string | null = null;

  /**
   * Constructor for notes api transport
   *
   * @param baseUrl - Base URL
   */
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * Set access token
   *
   * @param accessToken - token to set
   */
  public set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  /**
   * Get decoded access token
   */
  public isAccessTokenTokenValid(): boolean {
    if (!this._accessToken) {
      return false;
    }
    const { exp } = jwtDecode<AccessTokenPayload>(this._accessToken);

    return exp >= Date.now();
  }

  /**
   * Make authorized GET request
   *
   * @template Payload - response payload type
   * @param endpoint - API endpoint
   * @returns { Promise<Payload | null> } - Response payload
   */
  public async get<Payload>(endpoint: string): Promise<Payload | null> {
    const headers = {
      Authorization: `Bearer ${this._accessToken}`,
    };

    return await super.get<Payload>(endpoint, headers);
  }
}
