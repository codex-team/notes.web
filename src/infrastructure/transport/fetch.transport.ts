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
}
