import Transport from '../index';
import ApiResponse from './types/ApiResponse';

/**
 * Notes api transport
 */
export default class NotesApiTransport extends Transport {
  /**
   * Constructor for notes api transport
   *
   * @param baseUrl - Base URL
   */
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * Make GET request
   *
   * @template Payload - response payload type
   * @param endpoint - API endpoint
   * @returns { Promise<Payload | null> } - response payload
   */
  public async get<Payload>(endpoint: string): Promise<Payload | null> {
    const response = await super.get<ApiResponse<Payload>>(endpoint);

    /**
     * If data is not present in response
     */
    if (!response.data) {
      /**
       * TODO: Handle error
       */

      return null;
    }

    return response.data;
  }
}
