import Transport from '@/infrastructure/transport';

/**
 * Transport with authorization, requires access token
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
   * Get access token
   *
   * @returns { string | null } - Access token
   */
  public get accessToken(): string | null {
    return this._accessToken;
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
