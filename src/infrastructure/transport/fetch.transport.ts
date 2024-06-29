import type JSONValue from '@/infrastructure/transport/types/JSONValue';
import type MaybeJSONValueOrBlob from '@/infrastructure/transport/types/MaybeJSONValueOrBlob';

/**
 * Additional options for fetch transport
 */
export interface FetchTransportOptions {
  /**
   * Error formatter to create an Error based on status and payload
   */
  errorFormatter?: (status: number, payload: JSONValue, endpoint: string) => Error;
}

/**
 * Fetch transport to make HTTP requests
 */
export default class FetchTransport {
  /**
   * Common headers for all requests
   * For example, may contain authorization
   */
  protected readonly headers = new Headers();

  /**
   * Fetch constructor
   * @param baseUrl - Base URL
   * @param options - Transport options
   */
  constructor(
    private readonly baseUrl: string,
    private readonly options?: FetchTransportOptions
  ) {}

  /**
   * Gets specific resource
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   * @param isBlob - expected response type is binary
   */
  public async get<IsBlob extends boolean = false>(endpoint: string, data?: JSONValue, isBlob?: IsBlob): Promise<MaybeJSONValueOrBlob<IsBlob>> {
    const resourceUrl = new URL(this.baseUrl + endpoint);

    if (data !== undefined) {
      resourceUrl.search = new URLSearchParams(data as Record<string, string>).toString();
    }

    const response = await fetch(resourceUrl.toString(), {
      method: 'GET',
      headers: this.headers,
    });

    return this.parseResponse(response, endpoint, isBlob);
  }

  /**
   * Make POST request to update some resource
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param payload - JSON or form POST data body
   */
  public async post(endpoint: string, payload?: JSONValue | FormData): Promise<JSONValue> {
    /**
     * In case if passed payload is form data, we need to have auto generated Content-Type for multipar/form-data with boundary
     */
    if (payload instanceof FormData) {
      this.headers.delete('Content-Type');
    } else {
      this.headers.set('Content-Type', 'application/json');
    }

    /**
     * Send payload as body to allow Fastify accept it
     */
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: this.headers,
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    });

    return this.parseResponse(response, endpoint);
  }

  /**
   * Make DELETE request to remove some resource
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   */
  public async delete(endpoint: string, payload?: JSONValue): Promise<JSONValue> {
    this.headers.set('Content-Type', 'application/json');

    const response = await fetch(this.baseUrl + endpoint, {
      method: 'DELETE',
      headers: this.headers,
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    });

    return this.parseResponse(response, endpoint);
  }

  /**
   * Make PATCH request to update some resource
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   */
  public async patch(endpoint: string, payload?: JSONValue): Promise<JSONValue> {
    this.headers.set('Content-Type', 'application/json');

    /**
     * If the body undefined, request fails fastify validation
     * and sends a Bad Request, so we make it empty
     */
    const data = payload !== undefined ? payload : {};

    const response = await fetch(this.baseUrl + endpoint, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });

    return this.parseResponse(response, endpoint);
  }

  /**
   * Check response for errors
   * @param response - Response object
   * @param endpoint - API endpoint used for logging
   * @param isBlob - expected response type is binary
   * @throws Error
   */
  private async parseResponse<IsBlob extends boolean = false>(response: Response, endpoint: string, isBlob?: IsBlob): Promise<MaybeJSONValueOrBlob<IsBlob>> {
    let payload;

    /**
     * Try to parse error data. If it is not valid JSON or Blob, throw error
     */
    try {
      /**
       * In case if we are waiting for binary data, we need to parse response as Blob
       */
      payload = isBlob !== undefined && isBlob === true ? await response.blob() : await response.json();
    } catch (error) {
      throw new Error(`The response is not valid JSON (requesting ${endpoint})`);
    }

    /**
     * The 'ok' read-only property of the Response interface contains a Boolean
     * stating whether the response was successful (status in the range 200-299) or not
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
     */
    if (response.ok) {
      return payload;
    }

    /**
     * If error formatter is provided, use it to create an Error based on status and payload
     */
    if (this.options?.errorFormatter !== undefined) {
      throw this.options.errorFormatter(response.status, payload, endpoint);
    } else {
      throw new Error(`${response.statusText || 'Bad response'} (requesting ${endpoint}))`);
    }
  }
}
