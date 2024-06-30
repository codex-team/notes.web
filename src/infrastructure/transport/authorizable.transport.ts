import Transport from '@/infrastructure/transport';
import type { FetchTransportOptions } from './fetch.transport';
import type JSONValue from './types/JSONValue';

/**
 * Additional options for authorizable transport
 */
export interface AuthorizableTransportOptions extends FetchTransportOptions {}

/**
 * Additional params that could be specified for request
 */
export interface AuthorizableRequestParams {
  /**
   * If true, we don't need to wait for authorization for this request.
   * For example, used for authorization requests itself
   */
  skipAuthCheck?: boolean;
}

/**
 * Transport with authorization, requires access token
 */
export default class AuthorizableTransport extends Transport {
  /**
   * Current authorization status.
   *
   * Unknown - when authorization process is not finished yet
   * Authorized - we are authorized, access token is set
   * Unauthorized - we are not authorized, access token is not set
   */
  private authState: 'unknown' | 'authorized' | 'unauthorized' = 'unknown';

  /**
   * Queue of requests waiting for authorization
   *
   * Used when some request is made before authorization completed
   */
  private waitingAuthRequests: Array<() => void> = [];

  /**
   * Constructor for notes api transport
   * @param baseUrl - Base URL
   * @param options - Transport options
   */
  constructor(baseUrl: string, options?: AuthorizableTransportOptions) {
    super(baseUrl, options);
  }

  /**
   * Authorize transport
   * @param accessToken - JWT to send with the authorization header
   */
  public authorize(accessToken: string): void {
    this.headers.set('Authorization', `Bearer ${accessToken}`);

    this.authState = 'authorized';

    this.onAuthFinished();
  }

  /**
   * Continue anonymous session. All request will be made without authorization header
   */
  public continueAnonymous(): void {
    this.authState = 'unauthorized';

    this.onAuthFinished();
  }

  /**
   * Gets specific resource
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   * @param params - Additional params to tune request
   */
  public async get(endpoint: string, data?: JSONValue, params?: AuthorizableRequestParams): Promise<JSONValue> {
    await this.waitForAuth(params);

    return super.get(endpoint, data);
  }

  /**
   * Gets specific resource in binary
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   * @param params - Additional params to tune request
   */
    public async getBlob(endpoint: string, data?: JSONValue, params?: AuthorizableRequestParams): Promise<Blob> {
      await this.waitForAuth(params);

      return super.getBlob(endpoint, data);
    }

  /**
   * Make POST request to update some resource
   * @param endpoint - API endpoint
   * @param payload - JSON or form POST data body
   * @param params - Additional params to tune request
   */
  public async post(endpoint: string, payload?: JSONValue | FormData, params?: AuthorizableRequestParams): Promise<JSONValue> {
    await this.waitForAuth(params);

    return super.post(endpoint, payload);
  }

  /**
   * Make DELETE request to remove some resource
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   * @param params - Additional params to tune request
   */
  public async delete(endpoint: string, payload?: JSONValue, params?: AuthorizableRequestParams): Promise<JSONValue> {
    await this.waitForAuth(params);

    return super.delete(endpoint, payload);
  }

  /**
   * Make PATCH request to update some resource
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   * @param params - Additional params to tune request
   */
  public async patch(endpoint: string, payload?: JSONValue, params?: AuthorizableRequestParams): Promise<JSONValue> {
    await this.waitForAuth(params);

    return super.patch(endpoint, payload);
  }

  /**
   * If authorization process is not finished yet, enqueue request and wait for authorization
   * @param params - Additional params passed to tune request
   */
  private async waitForAuth(params?: AuthorizableRequestParams): Promise<void> {
    /**
     * If the request as marked as "skip auth check", we don't need to wait for auth
     */
    if (params?.skipAuthCheck === true) {
      return;
    }

    if (this.authState === 'unknown') {
      console.groupCollapsed('✋ Request enqueued util auth finished');
      console.trace();
      console.groupEnd();

      await new Promise((resolve) => {
        this.waitingAuthRequests.push(() => {
          resolve(undefined);
        });
      });
    }
  }

  /**
   * Called when auth process is finished. Now we know whether we are authorized or not.
   *
   * Sends enqueued requests
   */
  private onAuthFinished(): void {
    if (this.waitingAuthRequests.length === 0) {
      return;
    }

    console.groupCollapsed(`🤙 Auth finished, sending ${this.waitingAuthRequests.length} request(s) from queue...`);

    this.waitingAuthRequests.forEach((request) => {
      console.trace();
      request();
    });

    console.groupEnd();

    this.waitingAuthRequests = [];
  }
}
