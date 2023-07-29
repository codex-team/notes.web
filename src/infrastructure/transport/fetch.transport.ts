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
   * @returns { Promise<Response> } - Response data
   */
  public async get<Response>(endpoint: string): Promise<Response> {
    // eslint-disable-next-line no-undef
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'GET',
    });

    return await response.json();
  }

  /**
   * Make POST request
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @returns { Promise<Response> } - Response data
   */
  public async post<Response>(endpoint: string, payload: JSONValue): Promise<Response> {
    // eslint-disable-next-line no-undef
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  }
}
