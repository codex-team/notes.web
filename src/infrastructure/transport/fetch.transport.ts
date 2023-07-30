import type JSONValue from '@/infrastructure/transport/types/JSONValue';

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
   *
   * @param baseUrl - Base URL
   */
  constructor(private readonly baseUrl: string) {
  }

  /**
   * Gets specific resource
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   */
  public async get<Response>(endpoint: string, data?: JSONValue): Promise<Response> {
    const resourceUrl = new URL(this.baseUrl + endpoint);

    if (data !== undefined) {
      resourceUrl.search = new URLSearchParams(data as Record<string, string>).toString();
    }

    const response = await fetch(resourceUrl.toString(), {
      method: 'GET',
      headers: this.headers,
    });

    return await response.json();
  }

  /**
   * Make POST request to update some resource
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   */
  public async post<Response>(endpoint: string, payload?: JSONValue): Promise<Response> {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: Object.assign(this.headers, {
        'Accept': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      }),
      body: payload ? JSON.stringify(payload): undefined,
    });

    return await response.json();
  }

  /**
   * Make PATCH request to update some resource
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   */
  public async patch<Response>(endpoint: string, payload?: JSONValue): Promise<Response> {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'PATCH',
      headers: Object.assign(this.headers, {
        'Accept': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      }),
      body: payload ? JSON.stringify(payload): undefined,
    });

    return await response.json();
  }

  /**
   * Make DELETE request to remove some resource
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   */
  public async delete<Response>(endpoint: string, payload?: JSONValue): Promise<Response> {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'DELETE',
      headers: Object.assign(this.headers, {
        'Accept': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      }),
      body: payload ? JSON.stringify(payload) : undefined,
    });

    return await response.json();
  }
}
