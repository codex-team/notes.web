import Transport from '@/infrastructure/transport';
import type JSONValue from './types/JSONValue';

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

  /**
   * Make authorized GET request
   *
   * @template Payload - response payload type
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   */
  public async get<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    return await super.get<Payload>(endpoint, data);
  }

  /**
   * Make authorized POST request
   *
   * @template Payload - response payload type
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   */
  public async post<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    return await super.post<Payload>(endpoint, data);
  }

  /**
   * Make authorized DELETE request
   *
   * @template Payload - response payload type
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   */
  public async delete<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    return await super.delete<Payload>(endpoint, data);
  }
}
