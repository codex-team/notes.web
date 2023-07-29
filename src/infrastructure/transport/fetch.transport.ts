import type JSONValue from '@/infrastructure/transport/notes-api/types/JSONValue';

/**
 * Fetch transport to make HTTP requests
 */
export default class FetchTransport {
  /**
   * Fetch constructor
   *
   * @param baseUrl - Base URL
   */
  constructor(private readonly baseUrl: string) {
  }

  /**
   * Make GET request
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param headers - Request headers
   * @returns { Promise<Response> } - Response data
   */
  public async get<Response>(endpoint: string, headers?: Record<string, string>): Promise<Response> {
    // eslint-disable-next-line no-undef
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'GET',
      headers,
    });

    return await response.json();
  }

  /**
   * Make POST request
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   * @returns { Promise<Response> } - Response data
   */
  public async post<Response>(endpoint: string, payload: JSONValue): Promise<Response> {
    // eslint-disable-next-line no-undef
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  }
}
