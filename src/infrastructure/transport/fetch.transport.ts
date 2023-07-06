/**
 * Fetch transport to make HTTP requests
 */
export default class FetchTransport {
  /**
   * API url
   */
  private readonly baseUrl: string;

  /**
   * Fetch constructor
   *
   * @param url - API url
   */
  constructor(url: string) {
    this.url = url;
  }

  /**
   * Make GET request
   *
   * @param endpoint - API endpoint
   * @returns { Promise<Response> } - Response data
   */
  public async get<Response>(endpoint: string): Promise<Response> {
    // eslint-disable-next-line no-undef
    const response = await fetch(this.url + endpoint, {
      method: 'GET',
    });

    return await response.json();
  }
}
